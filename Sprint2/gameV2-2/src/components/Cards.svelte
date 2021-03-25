<script lang="ts">
  export let color: Color;
  export let value: Value | Number;

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

<img
  class="Cards"
  src={`../assets/Cards/${color}_${value}.png`}
  alt={`${color} - ${value}`}
  draggable={false}
  on:click={clickAction}
/>
