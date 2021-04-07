<script lang="ts">
  import Table from "./components/Game.svelte";
  import Player from "./components/Player.svelte";
  import Card from "./components/Cards.svelte";
  import Game from "./components/Game.svelte";
  import { GameState } from "./store";
  import PlayingField from "./components/PlayingField.svelte";

  let numOfPlayer;
</script>

<style>
</style>

<Game />
