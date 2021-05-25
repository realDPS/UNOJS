<script lang="ts">
  import { GameState, ID, getPlayerIndex } from "@store";
  import Player from "./Player.svelte";
  import PlayingField from "./PlayingField.svelte";
  import { socket } from "../App.svelte";

  let bgColor: string;

  $: switch ($GameState.currentColor) {
    case "Blue":
      bgColor = "#0098dc";
      break;
    case "Green":
      bgColor = "#33984b";
      break;
    case "Red":
      bgColor = "#ea323c";
      break;
    case "Yellow":
      bgColor = "#ffc825";
      break;
  }

  const enemies_position = { right: null, top: null, left: null };

  $: console.log($GameState);

  $: if ($GameState.numOfPlayers === $GameState.players.length) {
    displaySetup();
  }

  //Will check numbers of players and organize each client's enemies' position
  function displaySetup() {
    const players = $GameState.players;

    switch (players.length) {
      case 2:
        mode2players(players);
        break;
      case 3:
        mode3players(players);
        break;
      case 4:
        mode4players(players);
        break;
    }
  }

  function mode2players(playerArray: Array<PlayerData>) {
    let index = getPlayerIndex($GameState, $ID);

    enemies_position.top = index === 0 ? playerArray[1].id : playerArray[0].id;
  }

  function mode3players(playerArray: Array<PlayerData>) {
    let index = getPlayerIndex($GameState, $ID);

    switch (index) {
      case 0:
        enemies_position.right = playerArray[1].id;
        enemies_position.left = playerArray[2].id;
        break;
      case 1:
        enemies_position.right = playerArray[2].id;
        enemies_position.left = playerArray[0].id;
        break;
      case 2:
        enemies_position.right = playerArray[0].id;
        enemies_position.left = playerArray[1].id;
        break;
    }
  }

  function mode4players(playerArray: Array<PlayerData>) {
    let index = getPlayerIndex($GameState, $ID);

    switch (index) {
      case 0:
        enemies_position.right = playerArray[1].id;
        enemies_position.top = playerArray[2].id;
        enemies_position.left = playerArray[3].id;
        break;
      case 1:
        enemies_position.right = playerArray[2].id;
        enemies_position.top = playerArray[3].id;
        enemies_position.left = playerArray[0].id;
        break;
      case 2:
        enemies_position.right = playerArray[3].id;
        enemies_position.top = playerArray[0].id;
        enemies_position.left = playerArray[1].id;
        break;
      case 3:
        enemies_position.right = playerArray[0].id;
        enemies_position.top = playerArray[1].id;
        enemies_position.left = playerArray[2].id;
        break;
    }
  }
  //end of positionning display

  socket.on("gameStarted", (state: GameState) => {
    $GameState = state;
    socket.emit("updateState", state);
  });

  socket.on("updateState", (state: GameState) => {
    $GameState = state;
  });
</script>

<style>
  .Table {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
  }

  .Row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .Vertical {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .Horizontal {
    display: flex;
    justify-content: center;
    position: relative;
  }
</style>

<div class="Table" style="background-color: {bgColor};">
  <div class="Row">
    <div />
    <div class="Vertical">
      {#if enemies_position.top}
        <Player
          player={getPlayerIndex($GameState, enemies_position.top)}
          position="Up"
        />
      {/if}
    </div>
    <div />
  </div>
  <div class="Row">
    <div class="Horizontal">
      {#if enemies_position.left}
        <Player
          player={getPlayerIndex($GameState, enemies_position.right)}
          position="Left"
        />
      {/if}
    </div>

    <PlayingField />

    <div class="Horizontal">
      {#if enemies_position.right}
        <Player
          player={getPlayerIndex($GameState, enemies_position.left)}
          position="Right"
        />
      {/if}
    </div>
  </div>
  <div class="Row">
    <div />
    <div class="Vertical">
      <Player player={getPlayerIndex($GameState, $ID)} position="Down" />
    </div>
    <div />
  </div>
</div>
