<script lang="ts">
  import { getContext } from "svelte";
  import { GameState } from "../store";
  import { getRandomColor, getRandomValue } from "./Game.svelte";
  import { slide } from "svelte/transition";

  // Check notes for export functionality in Svelte
  export let faceDown: boolean = false;
  export let color: Color = !faceDown ? getRandomColor() : null;
  export let value: Value = !faceDown
    ? getRandomValue(color === "Wild" ? true : false)
    : null;
  export let index: number;
  export let animation: AnimationType = "None";
  export let playerNumber: number;
  export let discardPile: boolean = false;

  let hidden = false;
  $: hiddenClass = hidden ? "hidden" : "";

  function clickAction() {
    let playerIndex;

    switch ($GameState.playerTurn) {
      case "One":
        playerIndex = 0;
        break;
      case "Two":
        playerIndex = 1;
        break;
      case "Three":
        playerIndex = 2;
        break;
      case "Four":
        playerIndex = 3;
        break;
    }

    const card = $GameState.players[playerIndex].cardArray[index];
    $GameState.players[playerIndex].cardArray.splice(index, 1); // Original array is mutated
    //This is to circumvent Svelte limitation:
    $GameState.players[playerIndex].cardArray = [
      ...$GameState.players[playerIndex].cardArray,
    ]; // Re-assign cardArray with an array of itself.
    $GameState.discardPile.push(card);
    // console.log($GameState.players[0].cardArray);
    hidden = !hidden;

    console.log(`You clicked the card ${color} ${value}`);
  }
</script>

<style>
  .Cards {
    height: 150px;
    cursor: pointer;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    user-select: none;
  }

  .Pulse:hover {
    position: absolute;
    /* z-index: 0; */
    animation: Pulse;
    animation-duration: 250ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes Pulse {
    to {
      /* z-index: 2; */
      height: 200px;
    }
  }

  .Peek {
    position: relative;
    top: 0px;
  }

  .Peek:hover {
    position: relative;
    /* z-index: 2; */
    top: -30px;
    padding-bottom: 30px;
  }
</style>

{#if faceDown}
  <img
    class="Cards"
    src="../assets/Cards/Deck.png"
    alt="Face Down UNO card"
    draggable={false}
  />
{:else}
  <img
    class={`Cards ${animation} ${hiddenClass}`}
    src={value === "CC"
      ? "../assets/Cards/Wild.png"
      : `../assets/Cards/${color}_${value}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={!discardPile ? clickAction : null}
    transition:slide
  />
{/if}
