<script lang="ts">
  import { GameState, username } from "@store";
  import { onMount } from "svelte";
  import { socket } from "../App.svelte";
  import Cards from "./Cards.svelte";
  import WildSelection from "./modals/WildSelection.svelte";

  export let player: number;
  export let position: Position;

  $: PlayerCards = $GameState.players[player].cardArray;

  let NEXTPLAYER = player + 1 == $GameState.numOfPlayers ? 0 : player + 1;

  function discardCard({ detail: index }: { detail: number }) {
    const clickedCard = $GameState.players[player].cardArray[index];
    const { color, value } = clickedCard;

    if (
      color === "Wild" ||
      color === $GameState.currentColor ||
      value === $GameState.topCard.value
    ) {
      $GameState.players[player].cardArray.splice(index, 1);
      $GameState.players[player].cardArray = [
        ...$GameState.players[player].cardArray
      ];
      $GameState.drawDeck.push($GameState.topCard);

      NEXTPLAYER = player + 1 == $GameState.numOfPlayers ? 0 : player + 1;

      let jump = 1;
      switch (value) {
        case "Draw":
          $GameState.players[NEXTPLAYER].drewCard = true;
          jump = 2;
          break;
        case "Reverse":
          $GameState.isClockwise = !$GameState.isClockwise;
          break;
        case "Skip":
          jump = 2;
          break;
      }

      if ($GameState.isClockwise) {
        NEXTPLAYER =
          player + jump == $GameState.numOfPlayers ? 0 : player + jump;
      } else {
        NEXTPLAYER =
          player - jump == 0 ? $GameState.numOfPlayers - 1 : player - jump;
      }

      if ($GameState.numOfPlayers === 2) {
        if (value === "Reverse" || value === "Skip" || value === "Draw")
          NEXTPLAYER = $GameState.currentPlayer;
      }

      $GameState.topCard = clickedCard;
      $GameState.currentColor = color;

      //winner
      if ($GameState.players[player].cardArray.length == 0) {
        $GameState.winner = $username;
      }

      if (color !== "Wild") {
        //next player
        $GameState.players[player].turnToPlay = false;
        $GameState.players[NEXTPLAYER].turnToPlay = true;
        $GameState.currentPlayer = NEXTPLAYER;
        socket.emit("updateState", $GameState);
      }
    }
  }
  $: console.log("Player:", player, " ", $GameState.players[player].turnToPlay);
</script>

<style>
  .Player {
    display: flex;
    z-index: 2;
    position: absolute;
  }

  .CardDiv {
    width: min-content;
    height: min-content;
  }

  .Down {
    bottom: 0;
    left: auto;
    right: auto;
  }

  .Up {
    transform: rotate(180deg);
    left: auto;
    right: auto;
  }

  .Right {
    transform: rotate(270deg);
  }

  .Left {
    transform: rotate(90deg);
  }
</style>

{#if $GameState.currentColor === "Wild" && $GameState.players[player].turnToPlay}
  <WildSelection {player} {NEXTPLAYER} />
{/if}

<div
  class="Player {position}"
  style="padding-left : {15 * PlayerCards.length}px"
>
  <!-- For players' card -->
  <!-- {#if $GameState.players[player].username === $username} -->
  {#each PlayerCards as { id, color, value }, index (id)}
    <div
      class="CardDiv"
      style="z-index: {index}; position: relative; right: {15 * index}px;"
    >
      <Cards
        {color}
        {value}
        animation="Peek"
        {index}
        on:discard={discardCard}
        hand={true}
        faceDown={false}
        isHighlighted={$GameState.players[player].turnToPlay}
      />
    </div>
  {/each}
  <!-- {:else}

    {#each Array($GameState.players[player].handLength) as _number}
      <Cards faceDown={false} />
    {/each} -->
  <!-- {/if} -->
</div>
