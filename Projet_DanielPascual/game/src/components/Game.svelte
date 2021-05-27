<script lang="ts">
  import { GameState, ID, getPlayerIndex, username } from "@store";
  import Player from "./Player.svelte";
  import Button from "./elements/Button.svelte";
  import UnoText from "./modals/UnoMessage.svelte";
  import PlayingField from "./PlayingField.svelte";
  import { socket } from "../App.svelte";

  let bgColor: string;
  let names = [];
  let unoPopup: boolean = false;
  const playerIndex = getPlayerIndex($GameState, $ID);

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

  const enemies_position = { left: null, top: null, right: null };

  $: console.log($GameState);

  $: if ($GameState.numOfPlayers === $GameState.players.length) {
    displaySetup();
    namePanel();
  }

  function namePanel() {
    let position = ["right", "top", "left"];

    position.forEach((pos) => {
      if (enemies_position[pos] != null) {
        const index = getPlayerIndex($GameState, enemies_position[pos]);
        names.push($GameState.players[index].username);
      }
    });
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
    enemies_position.top =
      playerIndex === 0 ? playerArray[1].id : playerArray[0].id;
  }

  function mode3players(playerArray: Array<PlayerData>) {
    switch (playerIndex) {
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
    switch (playerIndex) {
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

  const uno = () => {
    if ($GameState.players[playerIndex].cardArray.length === 2) {
      console.log("UNO!");
      $GameState.players[playerIndex].uno = true;
      socket.emit("updateState", $GameState);
      unoPopup = true;
    }

    const prev = $GameState.previousPlayer;
    if (
      $GameState.players[prev].cardArray.length === 1 &&
      $GameState.players[prev].uno === false
    ) {
      console.log("OBJECTION!");
      for (let index = 0; index < 4; index++) {
        const card: CardType = $GameState.drawDeck.shift();
        $GameState.players[prev].cardArray.push(card);
        $GameState.players[prev].uno = false;
      }
      socket.emit("updateState", $GameState);
    }
  };
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

  .Panel {
    display: flex;
    width: 100vw;
    background-color: whitesmoke;
    z-index: 100;
    justify-content: space-evenly;
  }
  .name {
    margin: 1px 0 2px 0;
  }
  .Player {
    margin-bottom: 5em;
  }
  .Uno {
    position: absolute;
    bottom: 0;
    z-index: 100;
    margin-bottom: 1em;
    border: 1px solid black;
  }
</style>

{#if unoPopup === true}
  <UnoText
    player={$GameState.players[$GameState.currentPlayer].username}
    onClose={() => (unoPopup = false)}
  />
{/if}

<div class="Panel">
  {#each names as name}
    <p class="name">{name}</p>
  {/each}
</div>

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
    <div class="Vertical Player">
      <Player player={getPlayerIndex($GameState, $ID)} position="Down" />
    </div>
    <div />
  </div>
</div>
<div class="Uno">
  <Button on:click={uno} text={"UNO"} />
</div>
