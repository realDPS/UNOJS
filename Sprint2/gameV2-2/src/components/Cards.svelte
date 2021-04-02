<script lang="ts">
  // Check notes for export functionality in Svelte
  export let color: Color = "Blue";
  export let value: Value | Number = 1;
  export let faceDown = false;
  export let animation = false;

  $: animateable = animation ? "Animated" : "";

  let isSpecial = color ? false : true;

  function clickAction() {
    console.log(`You clicked the card ${value}`);
  }
</script>

<style>
  .Cards {
    height: 150px;
    cursor: pointer;
    /* transition: 150ms ease-in-out; */
  }

  .Animated:hover {
    animation: glow;
    animation-duration: 250ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    /* height: 200px; */
  }
  @keyframes glow {
    to {
      height: 200px;
    }
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
    class={`Cards ${animateable}`}
    src={`../assets/Cards/${color}_${value}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={clickAction}
  />
{/if}
