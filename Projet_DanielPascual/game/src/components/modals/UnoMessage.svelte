<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";

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
    position: fixed;
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
</style>

<div
  class="Modal"
  in:fly={{ y: -200, duration: 250 }}
  out:fly={{ y: -200, duration: 250 }}
>
  {player} : UNO!
</div>
