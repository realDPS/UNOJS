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
    background-color: black;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
    width: 600px;
    border-radius: 25px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    z-index: 200;
  }

  .Selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    height: 100%;
    border-radius: 25px;
  }

  .red {
    background-color: #ea323c;
  }
  .blue {
    background-color: #0098dc;
  }
  .green {
    background-color: #33984b;
  }
  .yellow {
    background-color: #ffc825;
  }

  .color {
    border: solid 2px black;
    cursor: pointer;
    border-radius: 25px;
    transition: all ease-in-out 100ms;
  }

  .color:hover {
    opacity: 0.8;
  }
</style>

<div
  class="Container"
  in:fly={{ y: -200, duration: 500 }}
  out:fly={{ y: -200, duration: 500 }}
>
  <div class="Selector">
    <button class="red color" on:click={() => changeColor("Red")} />
    <button class="blue color" on:click={() => changeColor("Blue")} />
    <button class="green color" on:click={() => changeColor("Green")} />
    <button class="yellow color" on:click={() => changeColor("Yellow")} />
  </div>
</div>
