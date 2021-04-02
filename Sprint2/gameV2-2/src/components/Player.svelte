<script lang="ts">
  import Cards from "./Cards.svelte";

  export let username: string;
  export let numOfCards: number;
  export let player: PlayerType;

  let playerNumber = 0;
  let cardArray = Array(numOfCards);

  switch (player) {
    case "one":
      playerNumber = 1;
      break;
    case "two":
      playerNumber = 2;
      break;
    case "three":
      playerNumber = 3;
      break;
    case "four":
      playerNumber = 4;
      break;
  }

  let yourTurn = false;
</script>

<style>
</style>

<div class="Player">
  {#each cardArray as nb, i}
    <Cards value={i} color="Red" />
  {/each}
</div>
