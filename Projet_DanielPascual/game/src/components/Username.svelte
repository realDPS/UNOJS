<script lang="ts">
  import InputField from "./InputField.svelte";
  import Button from "./Button.svelte";
</script>

<style>
  .center {
    display: flex;
    flex-direction: row;
  }

  .btn-container {
    display: grid;
    place-items: center;
  }

  .padding {
    padding: 10px;
  }
</style>

<div class="center">
  <div class="padding">
    <InputField text="Username" />
  </div>
  <div class="btn-container padding">
    <Button text="Start" />
  </div>
</div>
