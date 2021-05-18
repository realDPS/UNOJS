import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
  roomID: "",
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
    }
  ],
  drawDeck: [],
  topCard: null,
  drawCard: false
});

export const username = writable("");
export const gameStart = writable(false);
export const step = writable(0);

export const getPlayerIndex = (state: GameState, name: string) => {
  return state.players.findIndex((playerData) => {
    return playerData.username === name;
  });
};
