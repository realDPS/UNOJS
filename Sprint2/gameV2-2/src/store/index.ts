import { writable, Writable } from "svelte/store"

export const GameState: Writable<GameState> = writable({
    order: "clockwise",
    turn: "one",
    uno: false,
    players: [
        {
            numOfCards: 7,
            turnToPlay: true,
            uno: false,
            drewCard: false
        }
    ],
    topCard: {}
})

