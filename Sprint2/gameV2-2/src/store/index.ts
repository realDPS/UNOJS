import { writable, Writable } from "svelte/store"

export const GameState: Writable<GameState> = writable({
    order: "clockwise",
    playerTurn: "One",
    uno: false,
    players: [
        {
            cardArray: [],
            turnToPlay: true,
            uno: false,
            drewCard: false
        }
    ],
    drawDeck: [],
    discardPile: []
})

