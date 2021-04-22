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
  $: console.log($GameState.drawDeck);

  for (let i = 0; i < numOfPlayer; ++i) {
    for (let j = 0; j < 7; ++j) {
      $GameState.players[i].cardArray[j] = $GameState.drawDeck.shift();
    }
  }
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
    <div class="top" />
    <div />
  </div>
  <div class="Row">
    <div class="left" />
    <PlayingField />
    <div class="right" />
  </div>
  <div class="Row">
    <div />
    <Player player={0} />
    <div />
  </div>
</div>
