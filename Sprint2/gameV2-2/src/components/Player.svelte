<script lang="ts">
  import { setContext } from "svelte";

  import { GameState } from "../store";
  import { getRandomCard } from "./Game.svelte";
  import Cards from "./Cards.svelte";

  // export let username: string;
  export let numOfCards: number;
  export let player: Player;

  let playerNumber = 0;
  $: PlayerCards = $GameState.players[playerNumber].cardArray;

  //Setting up player's hand
  for (let i = 0; i < numOfCards; ++i) {
    $GameState.players[playerNumber].cardArray[i] = $GameState.drawDeck.shift();
  }

  switch (player) {
    case "One":
      playerNumber = 0;
      break;
    case "Two":
      playerNumber = 1;
      break;
    case "Three":
      playerNumber = 2;
      break;
    case "Four":
      playerNumber = 3;
      break;
  }

  let yourTurn = false;

  setContext("Player", playerNumber);
</script>

<style>
  .Player {
    display: flex;
    z-index: 2;
  }
</style>

<div class="Player">
  {#each PlayerCards as { color, value }, i}
    <Cards {color} {value} animation="Peek" index={i} />
  {/each}
</div>
