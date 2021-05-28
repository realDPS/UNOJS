<script lang="ts">
  import { fly } from "svelte/transition";
  import { GameState } from "@store";
  import Button from "../elements/Button.svelte";

  function restart() {
    location.reload();
  }
</script>

<style>
  .Container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }

  h1 {
    color: #326dbf;
  }
</style>

<div
  class="Container"
  in:fly={{ x: 200, duration: 250 }}
  out:fly={{ x: -200, duration: 250 }}
>
  <div>
    <h3>The winner is:</h3>
    <h1>{$GameState.winner}</h1>
  </div>
  <div>
    <Button text="Return to main page" on:click={restart} />
  </div>
</div>
