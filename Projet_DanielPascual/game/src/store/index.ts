import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
  roomId: "",
  order: "clockwise",
  currentPlayer: 0,
  uno: false,
  numOfPlayers: 2,
  players: [
    {
      username: "",
      cardArray: [],
      handLength: 0,
      turnToPlay: true,
      uno: false,
      drewCard: false
    },
    {
      username: "",
      cardArray: [],
      handLength: 0,
      turnToPlay: true,
      uno: false,
      drewCard: false
    }
  ],
  drawDeck: [],
  topCard: null,
  drawCard: false
});

export const username = writable("");
