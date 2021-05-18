"use strict";
exports.__esModule = true;
exports.getPlayerIndex = exports.gameStart = exports.username = exports.GameState = void 0;
var store_1 = require("svelte/store");
exports.GameState = store_1.writable({
    roomId: "",
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
        },
        {
            username: "",
            cardArray: [],
            handLength: 0,
            turnToPlay: false,
            uno: false,
            drewCard: false
        }
    ],
    drawDeck: [],
    topCard: null,
    drawCard: false
});
exports.username = store_1.writable("");
exports.gameStart = store_1.writable(false);
var getPlayerIndex = function (state, name) {
    return state.players.findIndex(function (playerData) {
        return playerData.username === name;
    });
};
exports.getPlayerIndex = getPlayerIndex;
