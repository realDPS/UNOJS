<script lang="ts">
  import { socket } from "../../App.svelte";
  import { fly } from "svelte/transition";
  import { GameState } from "@store";
  export let player: number;
  export let NEXTPLAYER: number;

  function changeColor(color: Color) {
    $GameState.currentColor = color;

    //next player
    $GameState.players[player].turnToPlay = false;
    $GameState.players[NEXTPLAYER].turnToPlay = true;
    $GameState.currentPlayer = NEXTPLAYER;

    socket.emit("updateState", $GameState);
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
  <button class="red" on:click={() => changeColor("Red")} />
  <button class="blue" on:click={() => changeColor("Blue")} />
  <button class="green" on:click={() => changeColor("Green")} />
  <button class="yellow" on:click={() => changeColor("Yellow")} />
</div>
