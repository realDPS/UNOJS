<script lang="ts">
  import { socket } from "../../App.svelte";
  import { fly } from "svelte/transition";
  import { GameState, colorModal } from "@store";
  export let player: number;
  export let NEXTPLAYER: number;

  function changeColor(color: Color) {
    console.log($GameState.currentColor);
    // let NEXTPLAYER,
    //   jump = 1;

    // const topCard = $GameState.topCard;
    // topCard.value;

    // if ($GameState.isClockwise) {
    //   NEXTPLAYER =
    //     $GameState.currentPlayer + jump == $GameState.numOfPlayers
    //       ? 0
    //       : $GameState.currentPlayer + jump;
    // } else {
    //   NEXTPLAYER =
    //     $GameState.currentPlayer - jump == 0
    //       ? $GameState.numOfPlayers - 1
    //       : $GameState.currentPlayer - jump;
    // }

    // //different actions on 2 players
    // if ($GameState.numOfPlayers === 2) {
    //   if (value === "Reverse" || value === "Skip") {
    //     NEXTPLAYER = $GameState.currentPlayer;
    //   }
    // }

    $GameState.currentColor = color;
    //next player
    $GameState.players[player].turnToPlay = false;
    $GameState.players[NEXTPLAYER].turnToPlay = true;
    $GameState.currentPlayer = NEXTPLAYER;

    socket.emit("updateState", $GameState);

    $colorModal = false;
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
