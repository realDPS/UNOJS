import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
    order: "clockwise",
    currentPlayer: 0,
    uno: false,
    players: [
        {
            cardArray: [],
            turnToPlay: true,
            uno: false,
            drewCard: false
        },
        {
            cardArray: [],
            turnToPlay: true,
            uno: false,
            drewCard: false
        }
    ],
    drawDeck: [],
    topCard: null,
    drawCard: false
});

