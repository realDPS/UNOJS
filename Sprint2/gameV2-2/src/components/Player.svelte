<script lang="ts">
  import { setContext } from "svelte";

  import { GameState } from "../store";
  import { getRandomCard } from "./Game.svelte";
  import Cards from "./Cards.svelte";

  // export let username: string;
  export let player: Player;

  let playerNumber = 0;
  $: PlayerCards = $GameState.players[playerNumber].cardArray;

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
  {#each PlayerCards as { id, color, value }, i (id)}
    <Cards {color} {value} animation="Peek" index={i} {playerNumber} />
  {/each}
</div>
