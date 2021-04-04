<script lang="ts">
  // Check notes for export functionality in Svelte
  export let color: Color = "Blue";
  export let value: Value | Number = 1;
  export let faceDown = false;
  export let animation: AnimationType = "None";

  let isSpecial = color ? false : true;

  function clickAction() {
    console.log(`You clicked the card ${value}`);
  }
</script>

<style>
  .Cards {
    height: 150px;
    cursor: pointer;
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
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    top: 0px;
  }

  .Peek:hover {
    position: relative;
    /* z-index: 2; */
    top: -20px;
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
    class={`Cards ${animation}`}
    src={`../assets/Cards/${color}_${value}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={clickAction}
  />
{/if}
