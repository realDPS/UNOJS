<script lang="ts">
  import { fly } from "svelte/transition";
  import { GameState, username } from "@store";

  function changeColor(color: string) {
    $GameState.currentColor = <Color>color;
    console.log($GameState.currentColor);
  }
</script>

<style>
  .Container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    height: 100%;
    grid-gap: 1px;
  }

  .red {
    background-color: red;
  }
  .blue {
    background-color: blue;
  }
  .green {
    background-color: green;
  }
  .yellow {
    background-color: yellow;
  }
</style>

<div
  class="Container"
  in:fly={{ x: 200, duration: 250 }}
  out:fly={{ x: -200, duration: 250 }}
>
  <button class="red" on:click={() => changeColor("red")} />
  <button class="blue" on:click={() => changeColor("blue")} />
  <button class="green" on:click={() => changeColor("green")} />
  <button class="yellow" on:click={() => changeColor("yellow")} />
</div>
