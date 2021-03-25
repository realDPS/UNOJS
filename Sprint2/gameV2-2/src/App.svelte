<script lang="ts">
  import Cards from "./components/Cards.svelte";
</script>

<style>
</style>

<main>
  {#each Array(10) as _, i}
    {#if i % 2 === 0}
      <Cards color={"Red"} value={i} />
    {/if}
  {/each}
</main>
