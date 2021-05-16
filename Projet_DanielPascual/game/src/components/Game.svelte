<script context="module" lang="ts">
  const colorArray: Array<Color> = ["Blue", "Red", "Green", "Yellow", "Wild"];
  const valueArray: Array<Value> = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "Reverse",
    "Draw",
    "Skip"
  ];

  const wildValueArray: Array<Value> = ["Draw", "CC"];

  export function getRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  export function getRandomValue(isWild: boolean) {
    let value: Value;

    if (isWild) {
      value = wildValueArray[Math.floor(Math.random() * wildValueArray.length)];
    } else {
      value = valueArray[Math.floor(Math.random() * valueArray.length)];
    }

    return value;
  }

  export function getRandomCard() {
    const color = getRandomColor();
    const value = getRandomValue(color === "Wild" ? true : false);
    return { color, value } as CardType;
  }

  export function randomize(Deck: Array<CardType>) {
    //Randomize array using Durstenfeld
    for (var i = Deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = Deck[i];
      Deck[i] = Deck[j];
      Deck[j] = temp;
    }

    return Deck;
  }

  function generateDeck() {
    let Deck: Array<CardType> = [];

    for (const color of colorArray) {
      if (color === "Wild") {
        for (const value of wildValueArray) {
          for (let i = 0; i < 4; ++i) {
            Deck.push({
              id: Deck.length,
              color,
              value
            });
          }
        }
        continue;
      }

      for (const value of valueArray) {
        Deck.push({ id: Deck.length, color, value });
        if (value !== 0) {
          Deck.push({ id: Deck.length, color, value });
        }
      }
    }

    return randomize(Deck);
  }
</script>

<script lang="ts">
  import { GameState, username } from "../store";
  import Cards from "./Cards.svelte";
  import Player from "./Player.svelte";
  import PlayingField from "./PlayingField.svelte";
  import { socket } from "../App.svelte";

  const enemies_position = { right: null, top: null, left: null };

  socket.on("gameStart", () => {
    displaySetup();
  });

  //Will check numbers of players and organize each client's enemies' position
  function displaySetup() {
    const players = $GameState.players;

    switch (players.length) {
      case 2:
        mode2players($username, players);
        break;
      case 3:
        mode3players($username, players);
        break;
      case 4:
        mode4players($username, players);
        break;
    }
  }

  function mode2players(username: string, playerArray: Array<PlayerData>) {
    let index = playerArray.findIndex((playerData) => {
      return playerData.username === username;
    });

    enemies_position.top =
      index === 0 ? playerArray[1].username : playerArray[0].username;
  }

  function mode3players(username: string, playerArray: Array<PlayerData>) {
    let index = playerArray.findIndex((playerData) => {
      return playerData.username === username;
    });

    switch (index) {
      case 0:
        enemies_position.right = playerArray[1].username;
        enemies_position.left = playerArray[2].username;
        break;
      case 1:
        enemies_position.right = playerArray[2].username;
        enemies_position.left = playerArray[0].username;
        break;
      case 2:
        enemies_position.right = playerArray[0].username;
        enemies_position.left = playerArray[1].username;
        break;
    }
  }

  function mode4players(username: string, playerArray: Array<PlayerData>) {
    let index = playerArray.findIndex((playerData) => {
      return playerData.username === username;
    });

    switch (index) {
      case 0:
        enemies_position.right = playerArray[1].username;
        enemies_position.top = playerArray[2].username;
        enemies_position.left = playerArray[3].username;
        break;
      case 1:
        enemies_position.right = playerArray[2].username;
        enemies_position.top = playerArray[3].username;
        enemies_position.left = playerArray[0].username;
        break;
      case 2:
        enemies_position.right = playerArray[3].username;
        enemies_position.top = playerArray[0].username;
        enemies_position.left = playerArray[1].username;
        break;
      case 3:
        enemies_position.right = playerArray[0].username;
        enemies_position.top = playerArray[1].username;
        enemies_position.left = playerArray[2].username;
        break;
    }
  }
  //end of positionning display

  $GameState.drawDeck = generateDeck();
  $: console.log($GameState.drawDeck);

  //Initial hand for each player
  for (let i = 0; i < $GameState.numOfPlayers; ++i) {
    for (let j = 0; j < 7; ++j) {
      $GameState.players[i].cardArray[j] = $GameState.drawDeck.shift();
    }
  }
  //test player 2
  $GameState.players[1].username = "testy";
  enemies_position.top = "testy";
</script>

<style>
  .Table {
    width: 100%;
    height: 100%;
    background-color: #75737b;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
  }
  div {
    border: 1px solid black;
  }

  .Row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
</style>

<div class="Table">
  <div class="Row">
    <div />
    <div class="top">
      {#if enemies_position.top}
        <Player
          player={$GameState.players.findIndex((playerData) => {
            return playerData.username === enemies_position.top;
          })}
        />
      {/if}
    </div>
    <div />
  </div>
  <div class="Row">
    <div class="left">
      {#if enemies_position.left}
        <Player
          player={$GameState.players.findIndex((playerData) => {
            return playerData.username === enemies_position.left;
          })}
        />
      {/if}
    </div>
    <PlayingField />
    <div class="right">
      {#if enemies_position.right}
        <Player
          player={$GameState.players.findIndex((playerData) => {
            return playerData.username === enemies_position.right;
          })}
        />
      {/if}
    </div>
  </div>
  <div class="Row">
    <div />
    <div class="down">
      <Player
        player={$GameState.players.findIndex((playerData) => {
          return playerData.username === $username;
        })}
      />
    </div>
    <div>3</div>
  </div>
</div>
