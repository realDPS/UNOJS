<script lang="ts">
  import { GameState, username, getPlayerIndex } from "@store";
  import { onMount } from "svelte";
  import { socket } from "../App.svelte";
  import Cards from "./Cards.svelte";

  export let player: number;

  $: PlayerCards = $GameState.players[player].cardArray;

  onMount(() => {
    console.log(player);
  });

  function discardCard({ detail: index }: { detail: number }) {
    const clickedCard = $GameState.players[player].cardArray[index];
    const { color, value } = clickedCard;

    if (
      color === "Wild" ||
      $GameState.topCard.color === "Wild" ||
      color === $GameState.topCard.color ||
      value === $GameState.topCard.value
    ) {
      $GameState.players[player].cardArray.splice(index, 1);
      $GameState.players[player].cardArray = [
        ...$GameState.players[player].cardArray
      ];
      $GameState.drawDeck.push($GameState.topCard);

      if (value === "Draw") {
        let nextPlayer = $GameState.currentPlayer + 1;
        if (nextPlayer === $GameState.numOfPlayers) {
          nextPlayer = 0;
        }
        $GameState.players[nextPlayer].drewCard = true;
      }

      $GameState.topCard = clickedCard;

      //Unchecked

      let turnIndex = player + 1;
      if (turnIndex === $GameState.numOfPlayers) {
        turnIndex = 0;
      }

      $GameState.currentPlayer = turnIndex;
      $GameState.players[turnIndex].turnToPlay = true;
      $GameState.players[player].turnToPlay = false;

      socket.emit("updateState", $GameState);

      if ($GameState.players[player].cardArray.length == 0) {
        //destroy room on playerWin and on "playerWin", create a modal with Winner + show all cards
        $GameState.endGame = true;
        socket.emit("playerWin", $GameState.players[player].username);
      }
    }
  }
</script>

<style>
  .Player {
    display: flex;
    z-index: 2;
    padding-left: 50px;
    justify-content: center;
    align-items: center;
  }

  .CardDiv {
    width: min-content;
    height: min-content;
  }
</style>

<div class="Player">
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
