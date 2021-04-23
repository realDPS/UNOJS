<script lang="ts">
  import { randomize } from "./Game.svelte";
  import { GameState } from "../store";
  import Cards from "./Cards.svelte";

  // export let username: string;
  export let player: PlayerType;

  // let playerNumber: number;
  let yourTurn: boolean;
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
      $GameState.topCard = clickedCard;
    }

    // $GameState.currentPlayer =
    // 	$GameState.currentPlayer === 3
    // 		? 0
    // 		: (($GameState.currentPlayer + 1) as PlayerType);
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
      />
    </div>
  {/each}
</div>
