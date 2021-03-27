<script lang="ts">
  import Card from "./Cards.svelte";
</script>

<style>
  .Table {
    background-color: blue;
    display: flex;
    padding: 20px;
  }

  .Separator {
    width: 10px;
  }
</style>

<div class="Table">
  <Card faceDown={true} />
  <span class="Separator" />
  <Card />
</div>
