<script lang="ts">
  import { getContext } from "svelte";
  import { GameState } from "../store";
  import { getRandomColor, getRandomValue } from "./Game.svelte";

  // Check notes for export functionality in Svelte
  export let color: Color = getRandomColor();
  export let value: Value = getRandomValue(color === "Wild" ? true : false);
  export let index: number;
  export let faceDown = false;
  export let animation: AnimationType = "None";

  let hidden = false;
  $: hiddenClass = hidden ? "hidden" : "";

  function clickAction() {
    let Card;
    switch ($GameState.playerTurn) {
      case "One":
        Card = $GameState.players[0].cardArray[index];
        $GameState.players[0].cardArray.splice(index, 1); // Original array is mutated
        //This is to circumvent Svelte limitation:
        $GameState.players[0].cardArray = [...$GameState.players[0].cardArray]; // Re-assign cardArray with a new Array with it's old content.
        $GameState.discardPile.push(Card);
        // console.log($GameState.players[0].cardArray);
        break;
      case "Two":
        Card = $GameState.players[1].cardArray[index];
        $GameState.players[1].cardArray.splice(index, 1);
        $GameState.discardPile.push(Card);
        break;

      case "Three":
        Card = $GameState.players[2].cardArray[index];
        $GameState.players[2].cardArray.splice(index, 1);
        $GameState.discardPile.push(Card);
        break;

      case "Four":
        Card = $GameState.players[3].cardArray[index];
        $GameState.players[3].cardArray.splice(index, 1);
        $GameState.discardPile.push(Card);
        break;
    }

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
{:else if value === "CC"}
  <img
    class={`Cards ${animation} ${hiddenClass}`}
    src={`../assets/Cards/${color}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={clickAction}
  />
{:else}
  <img
    class={`Cards ${animation} ${hiddenClass}`}
    src={`../assets/Cards/${color}_${value}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={clickAction}
  />
{/if}
