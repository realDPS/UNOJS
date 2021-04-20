<script lang="ts">
  import Table from "./components/Game.svelte";
  import Player from "./components/Player.svelte";
  import Card from "./components/Cards.svelte";
  import Game from "./components/Game.svelte";
  import { GameState } from "./store";
  import PlayingField from "./components/PlayingField.svelte";
  import LobbySetup from "./components/LobbySetup.svelte";

  let numOfPlayer;
  $: console.log($GameState.currentPlayer);
</script>

<style>
  :global(body) {
    overflow: hidden;
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

<div class="LobbyModal">
  <LobbySetup />
</div>
<Game />
