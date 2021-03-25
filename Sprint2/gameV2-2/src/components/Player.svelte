<script lang="ts">
  import Cards from "./Cards.svelte";

  export let username: string;
  export let numOfCards: number;
</script>

<style>
</style>

<div class="Player">
  <Cards />
</div>
