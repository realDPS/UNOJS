<script lang="ts">
  import Card from "./Cards.svelte";
  import PlayingField from "./PlayingField.svelte";

  // function setGame
</script>

<style>
  .Table {
    background-color: blue;
    display: flex;
    padding: 20px;
  }

  /* .Separator {
    width: 10px;
  } */

  .PlayingField {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="Table">
  <div class="PlayingField">
    <PlayingField />
  </div>
</div>
