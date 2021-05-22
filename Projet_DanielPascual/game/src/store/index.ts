import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
  roomID: "",
  gameStarted: false,
  order: "clockwise",
  currentPlayer: 0,
  uno: false,
  numOfPlayers: 2,
  players: [
    {
      id: "",
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
  endGame: false
});

export const username = writable("");
export const step = writable(0);

export const getPlayerIndex = (state: GameState, name: string) => {
  return state.players.findIndex((playerData) => {
    return playerData.username === name;
  });
};
