import {writable, Writable} from "svelte/store"

let state : GameState = {
    order:"clockwise",
    turn: "Player 1",
    uno: null 
}

export let GameState: Writable<GameState> = writable(state)