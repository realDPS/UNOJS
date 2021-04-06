<script lang="ts">
  import Table from "./components/Table.svelte";
  import Player from "./components/Player.svelte";
  import Card from "./components/Cards.svelte";
  import { GameState } from "./store";
  import PlayingField from "./components/PlayingField.svelte";

  let value = $GameState.players[0].cardArray;

  setTimeout(() => {
    console.log(value[0]);
  }, 0);
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

  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* overflow: visible; */
  }

  .Row {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-color: black;
    border-style: solid;
  }

  .Column {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: brown;
    border-color: black;
    border-style: solid;
    overflow: visible;
    padding: 50px;
  }

  /* #player {
    display: flex;
  } */

  .Player2 {
    color: blue;
    transform: rotate(-90deg);
  }
  #player4 {
    color: blue;
    transform: rotate(220deg);
  }
</style>

<main>
  {#each Array(3) as _, i}
    <!-- Row Flex Container x3 -->
    <div class="Row {i + 1}">
      {#each Array(3) as _, j}
        <!-- Column Flex Container x3 -->
        <div class="Column {j + 1}">
          {#if i == 2 && j == 1}
            <!-- Flex Child Element -->
            <Player numOfCards={7} />
          {:else if i == 1 && j == 0}
            <div id="player2">
              <!-- Flex Child Element -->
            </div>
          {:else if i === 1 && j === 1}
            <PlayingField />
          {:else if i == 0 && j == 1}
            <!-- Flex Child Element -->
            <input type="text" />
          {:else if i == 1 && j == 2}
            <!-- Flex Child Element -->
            <div id="player4">Player 4</div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}

  <!-- <div class="Animation">
    <Card animation={true} />
    <div class="center">
      <PlayingField />
    </div>
  </div> -->
</main>
