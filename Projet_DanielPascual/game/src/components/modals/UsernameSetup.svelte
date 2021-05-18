<script lang="ts">
  import TextInput from "../TextInput.svelte";
  import Button from "../Button.svelte";
  import { username } from "../../store";
  import { fly } from "svelte/transition";
  export let userSetupDone = false;

  function handleKey(event: KeyboardEvent) {
    if (event.key === "Enter") {
      setUsername();
    }
  }

  function setUsername() {
    if ($username !== "") {
      userSetupDone = true;
    }
    console.log(userSetupDone);

    console.log($username);
  }
</script>

<style>
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
</style>

<svelte:window on:keydown={handleKey} />

<div
  class="center"
  in:fly={{ x: -200, duration: 250 }}
  out:fly={{ x: -200, duration: 250 }}
>
  <TextInput label="Username" bind:value={$username} autofocus />

  <Button text="Continue" on:click={setUsername} />
</div>
