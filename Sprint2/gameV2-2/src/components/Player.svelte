<script lang="ts">
  import Cards from "./Cards.svelte";

  export let username: string;
  export let numOfCards: number;
  let cardArray = Array(numOfCards);

  let yourTurn = false;
</script>

<style>
</style>

<div class="Player">
  {#each cardArray as nb, i}
    <Cards value={i} color="Red" />
  {/each}
</div>
