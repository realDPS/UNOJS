<script context="module">
  import { io } from "socket.io-client";

  export const socket = io("http://localhost:3000", { reconnection: true });
</script>

<script lang="ts">
  import Game from "./components/Game.svelte";
  import { GameState } from "@store";

  import Modal from "./components/modals/Modal.svelte";
</script>

<style>
  :global(body) {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin: 0;
  }
</style>

{#if !$GameState.gameStarted}
  <Modal />
{:else}
  <Game />
{/if}
