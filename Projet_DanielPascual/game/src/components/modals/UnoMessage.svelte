<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let player: string;
  export let onClose;

  let id = setInterval(() => {
    onClose();
    clearInterval(id);
  }, 800);
</script>

<style>
  .Modal {
    display: grid;
    place-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    width: 300px;
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
    /* background-color: rgba(0, 0, 0, 0.5); */
  }
</style>

<div
  class="filter"
  in:fade={{ duration: 250, delay: 50 }}
  out:fly={{ x: -200, duration: 250 }}
>
  <div class="Modal">
    {player} : UNO!
  </div>
</div>
