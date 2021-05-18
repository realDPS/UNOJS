<script context="module">
  import { io } from "socket.io-client";

  export const socket = io("http://localhost:3000");
</script>

<script lang="ts">
  import Table from "./components/Game.svelte";
  import Player from "./components/Player.svelte";
  import Card from "./components/Cards.svelte";
  import Game from "./components/Game.svelte";
  import { gameStart, GameState } from "./store";
  import PlayingField from "./components/PlayingField.svelte";
  import Modal from "./components/Modal.svelte";
  import { onMount } from "svelte";
  import TextInput from "./components/TextInput.svelte";

  $: console.log($GameState.currentPlayer);
</script>

<style>
  :global(body) {
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin: 0;
  }

  .LobbyModal {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .Game {
    z-index: 0;
  }
</style>

{#if !$gameStart}
  <Modal />
{/if}
<Game />
