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
    "Skip",
  ];
  const wildValueArray: Array<Value> = ["Draw", "CC"];

  export function getRandomColor() {
    let color: Color;

    color = colorArray[Math.floor(Math.random() * colorArray.length)];
    return color;
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

  function generateDeck() {
    let Deck: Array<CardType> = [];

    for (const color of colorArray) {
      if (color === "Wild") {
        for (const value of wildValueArray) {
          for (let i = 0; i < 4; ++i) {
            Deck.push({
              color,
              value,
            });
          }
        }
        continue;
      }

      for (const value of valueArray) {
        Deck.push({ color, value });
        if (value !== 0) {
          Deck.push({ color, value });
        }
      }
    }

    //Randomize array using Durstenfeld
    for (var i = Deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = Deck[i];
      Deck[i] = Deck[j];
      Deck[j] = temp;
    }

    return Deck;
  }
</script>

<script lang="ts">
  import { GameState } from "../store";
  import Cards from "./Cards.svelte";
  import Player from "./Player.svelte";
  import PlayingField from "./PlayingField.svelte";

  export let numOfPlayer: number = 2;
  let layout;

  switch (numOfPlayer) {
    case 2:
      layout = "Two Players";
      break;
    case 3:
      layout = "Three Players";
      break;
    case 4:
      layout = "Four Players";
      break;
  }

  $GameState.drawDeck = generateDeck();
  console.log($GameState.drawDeck);
</script>

<style>
  .Table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* overflow: visible; */
  }

  .center {
    /* Found centering in https://www.w3schools.com/css/css_align.asp */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

<div class="Table">
  {#each Array(3) as _, i}
    <div class="Row {i + 1}">
      {#each Array(3) as _, j}
        <div class="Column {j + 1}">
          {#if i == 2 && j == 1}
            <Player player="One" numOfCards={7} />
          {:else if i == 1 && j == 0}
            <div id="player2" />
          {:else if i === 1 && j === 1}
            <PlayingField />
          {:else if i == 0 && j == 1}
            <div>Player 3</div>
          {:else if i == 1 && j == 2}
            <div id="player4">Player 4</div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>
