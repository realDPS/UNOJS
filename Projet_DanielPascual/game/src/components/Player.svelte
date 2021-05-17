<script lang="ts">
  import { randomize } from "./Game.svelte";
  import { GameState, username, getPlayerIndex } from "../store";
  import { socket } from "../App.svelte";
  import Cards from "./Cards.svelte";
  import { each } from "svelte/internal";

  export let player: number;
  export let isMyHand: boolean = false;
  $: PlayerCards = $GameState.players[player].cardArray;

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
      $GameState.drawDeck = randomize($GameState.drawDeck);

      const numOfCards = $GameState.players[player].cardArray.length;
      socket.emit("newHand", { player, numOfCards });

      const sendDeck = $GameState.drawDeck;
      socket.emit("updateDeck", sendDeck);

      $GameState.topCard = clickedCard;
      socket.emit("topCard", clickedCard);

      //Unchecked
      if ($GameState.players[player].cardArray.length == 0) {
        //destroy room on playerWin and on "playerWin", create a modal with Winner + show all cards
        socket.emit("playerWin", player);
      }
      //TODO:UNCHECKED
      let turnIndex = getPlayerIndex($GameState, $username);

      turnIndex++;
      if (turnIndex === $GameState.numOfPlayers) {
        turnIndex = 0;
      }
      socket.emit("NextPlayerTurn", turnIndex);
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
  {#if $GameState.players[player].username === $username}
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
          faceDown={!isMyHand}
          isHighlighted={$GameState.players[player].turnToPlay}
        />
      </div>
    {/each}
  {:else}
    <!-- for opponents' cards -->
    {#each Array($GameState.players[player].handLength) as _number}
      <Cards faceDown={true} />
    {/each}
  {/if}
</div>
