<script lang="ts">
  export let color: Color = "Blue";
  export let value: Value | Number = 1;
  export let faceDown = false;

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
    class="Cards"
    src={`../assets/Cards/${color}_${value}.png`}
    alt={`${color} - ${value}`}
    draggable={false}
    on:click={clickAction}
  />
{/if}
