<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { GameState, username, getPlayerIndex } from "@store";

  // Check notes for export functionality in Svelte
  export let faceDown: boolean = false;
  export let color: Color;
  export let value: Value;
  export let animation: AnimationType = "None";
  export let index: number = null;
  export let hand = false;

  export let isHighlighted: boolean = false;

  $: handClass = hand ? "Hand" : null;
  $: noHighlight = isHighlighted ? "" : "noLight";

  const dispatch = createEventDispatcher();

  function clickAction() {
    //refuse click if not player's turn
    if (!$GameState.players[getPlayerIndex($GameState, $username)].turnToPlay) {
      return;
    }

    dispatch("discard", index);

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
    position: relative;
    z-index: 0;
    animation: Pulse;
    animation-duration: 250ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes Pulse {
    to {
      z-index: 2;
      height: 200px;
    }
  }

  .Peek {
    position: relative;
    top: 0px;
  }

  .Peek:hover {
    position: relative;
    top: -30px;
    /* padding-bottom: 30px; */
  }

  .PeekDown {
    position: relative;
    bottom: 0px;
  }

  .PeekDown:hover {
    position: relative;
    bottom: -40px;
    /* padding-bottom: 30px; */
  }

  .Hand {
    overflow-x: hidden;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0);
    filter: drop-shadow(-15px 15px 10px rgba(0, 0, 0, 0.5));
  }
  #noLight {
    filter: brightness(50%) drop-shadow(-15px 15px 10px rgba(0, 0, 0, 0.5));
  }
</style>

{#if faceDown}
  <img
    class="Cards {animation}"
    id={noHighlight}
    src="/assets/Cards/Deck.png"
    alt="Face Down UNO card"
    draggable={false}
  />
{:else}
  <img
    class="Cards {animation} {handClass}"
    id={noHighlight}
    src={value === "CC"
      ? "/assets/Cards/Wild.png"
      : `/assets/Cards/${color}_${value}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={clickAction}
    transition:slide
  />
{/if}
