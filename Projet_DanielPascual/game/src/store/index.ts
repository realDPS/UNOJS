import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
  roomId: "",
  order: "clockwise",
  currentPlayer: 0,
  uno: false,
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

export let username = writable("");
