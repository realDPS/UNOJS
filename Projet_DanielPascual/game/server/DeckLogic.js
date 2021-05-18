"use strict";
exports.__esModule = true;
exports.generateDeck = exports.randomize = exports.getRandomCard = exports.getRandomValue = exports.getRandomColor = void 0;
var colorArray = ["Blue", "Red", "Green", "Yellow", "Wild"];
var valueArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "Reverse",
    "Draw",
    "Skip"
];
var wildValueArray = ["Draw", "CC"];
function getRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}
exports.getRandomColor = getRandomColor;
function getRandomValue(isWild) {
    var value;
    if (isWild) {
        value = wildValueArray[Math.floor(Math.random() * wildValueArray.length)];
    }
    else {
        value = valueArray[Math.floor(Math.random() * valueArray.length)];
    }
    return value;
}
exports.getRandomValue = getRandomValue;
function getRandomCard() {
    var color = getRandomColor();
    var value = getRandomValue(color === "Wild" ? true : false);
    return { color: color, value: value };
}
exports.getRandomCard = getRandomCard;
function randomize(Deck) {
    //Randomize array using Durstenfeld
    for (var i = Deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = Deck[i];
        Deck[i] = Deck[j];
        Deck[j] = temp;
    }
    return Deck;
}
exports.randomize = randomize;
function generateDeck() {
    var Deck = [];
    for (var _i = 0, colorArray_1 = colorArray; _i < colorArray_1.length; _i++) {
        var color = colorArray_1[_i];
        if (color === "Wild") {
            for (var _a = 0, wildValueArray_1 = wildValueArray; _a < wildValueArray_1.length; _a++) {
                var value = wildValueArray_1[_a];
                for (var i = 0; i < 4; ++i) {
                    Deck.push({
                        id: Deck.length,
                        color: color,
                        value: value
                    });
                }
            }
            continue;
        }
        for (var _b = 0, valueArray_1 = valueArray; _b < valueArray_1.length; _b++) {
            var value = valueArray_1[_b];
            Deck.push({ id: Deck.length, color: color, value: value });
            if (value !== 0) {
                Deck.push({ id: Deck.length, color: color, value: value });
            }
        }
    }
    return randomize(Deck);
}
exports.generateDeck = generateDeck;
