<script lang="ts">
  import Table from "./components/Table.svelte";
  import Player from "./components/Player.svelte";
  import { GameState } from "./store";
</script>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .test {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<main>
  <div>
    <Player numOfCards={3} />
  </div>
  <div class="test">
    <Player numOfCards={5} />
    <Table />
    <Player numOfCards={7} />
  </div>
  <div>
    <Player numOfCards={10} />
  </div>
</main>
