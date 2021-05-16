<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import InputField from "./InputField.svelte";
  import Button from "./Button.svelte";
  import { username } from "../store";
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
    <!-- TODO -->
    <!-- <Button text="Continue" on:click={}/> -->
  </div>
</div>
