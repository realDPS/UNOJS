<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TextInput from "../TextInput.svelte";
  import Button from "../Button.svelte";
  import { username } from "../../store";
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
    <TextInput label="Username" bind:value={$username} />
  </div>
  <div class="btn-container padding">
    <Button text="Continue" />
  </div>
</div>
