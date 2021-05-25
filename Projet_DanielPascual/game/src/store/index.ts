import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
  roomID: "",
  gameStarted: false,
  isClockwise: true,
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
  winner: null,
  currentColor: null
});

export const username = writable("");
export const ID = writable("");
export const step = writable(0);

export const getPlayerIndex = (state: GameState, id: string) => {
  return state.players.findIndex((playerData) => {
    return playerData.id === id;
  });
};
