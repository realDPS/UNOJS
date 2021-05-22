<script lang="ts">
  import { step } from "@store";
  import { UsernameSetup, GameSetup, Waiting } from "./";
  import { fly } from "svelte/transition";

  let components = [UsernameSetup, GameSetup, Waiting];
</script>

<style>
  .Modal {
    display: grid;
    place-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 350px;
    width: 600px;
    border-radius: 15px;
    background-color: #cfcfcf;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    z-index: 10;
  }

  .filter {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>

<div class="filter" transition:fly>
  <div class="Modal">
    <svelte:component this={components[$step]} />
  </div>
</div>
