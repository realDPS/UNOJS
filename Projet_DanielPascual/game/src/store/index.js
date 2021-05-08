"use strict";
exports.__esModule = true;
exports.GameState = void 0;
var store_1 = require("svelte/store");
exports.GameState = store_1.writable({
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
