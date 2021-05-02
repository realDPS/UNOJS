<script context="module">
  import { io } from "socket.io-client";

  export const socket = io("http://localhost:3000");
</script>

<script lang="ts">
  import Table from "./components/Game.svelte";
  import Player from "./components/Player.svelte";
  import Card from "./components/Cards.svelte";
  import Game from "./components/Game.svelte";
  import { GameState } from "./store/store";
  import PlayingField from "./components/PlayingField.svelte";
  import LobbySetup from "./components/LobbySetup.svelte";
  import { onMount } from "svelte";

  let numOfPlayer;
  $: console.log($GameState.currentPlayer);

  // onMount(async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/gamestate", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify($GameState)
  //     });

  //     const json = await res.json();
  //     const result = await JSON.stringify(json);
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
</script>

<style>
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

<div class="LobbyModal">
  <LobbySetup />
</div>
<Game />
