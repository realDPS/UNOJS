<script lang="ts">
  import { setContext } from "svelte";

  import { GameState } from "../store";
  import { getCard } from "../utilities/function";
  import Cards from "./Cards.svelte";

  // export let username: string;
  export let numOfCards: number;
  export let player: Player;

  let playerNumber = 0;

  let playerCards = $GameState.players[playerNumber].cardArray;

  for (let i = 0; i < numOfCards; ++i) {
    playerCards[i] = getCard();
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
  {#each playerCards as { color, value }, i}
    <Cards {color} {value} animation="Peek" />
  {/each}
</div>
