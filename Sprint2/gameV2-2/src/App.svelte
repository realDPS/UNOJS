<script lang="ts">
  import Table from "./components/Table.svelte";
  import Player from "./components/Player.svelte";
  import Card from "./components/Cards.svelte";
  import { GameState } from "./store";
  import PlayingField from "./components/PlayingField.svelte";
</script>

<style>
  /* .Animation {
    position: absolute;
    animation: slide;
    animation-timing-function: ease-in-out;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes slide {
    from {
      top: -150px;
    }
    to {
      top: 0px;
    }
  } */

  .center {
    /* Found centering in https://www.w3schools.com/css/css_align.asp */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<main>
  <div class="Animation">
    <Card animation={true} />
    <div class="center">
      <PlayingField />
    </div>
  </div>
</main>
