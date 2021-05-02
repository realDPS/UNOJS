import { writable, Writable } from "svelte/store";

export const GameState: Writable<GameState> = writable({
    order: "clockwise",
    currentPlayer: 0,
    uno: false,
    players: [
        {
            username: "",
            cardArray: [],
            HandLength: 0,
            turnToPlay: true,
            uno: false,
            drewCard: false
        },
        {
            username: "",
            cardArray: [],
            HandLength: 0,
            turnToPlay: true,
            uno: false,
            drewCard: false
        }
    ],
    drawDeck: [],
    topCard: null,
    drawCard: false
});

