const colorArray: Array<Color> = ["Blue", "Red", "Green", "Yellow", "Wild"];
const valueArray: Array<Value> = [
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
const wildValueArray: Array<Value> = ["Draw", "CC"];

export function getRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export function getRandomValue(isWild: boolean) {
    let value: Value;

    if (isWild) {
        value = wildValueArray[Math.floor(Math.random() * wildValueArray.length)];
    } else {
        value = valueArray[Math.floor(Math.random() * valueArray.length)];
    }

    return value;
}

export function getRandomCard() {
    const color = getRandomColor();
    const value = getRandomValue(color === "Wild" ? true : false);
    return { color, value } as CardType;
}

export function randomize(Deck: Array<CardType>) {
    //Randomize array using Durstenfeld
    for (var i = Deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = Deck[i];
        Deck[i] = Deck[j];
        Deck[j] = temp;
    }

    return Deck;
}

function generateDeck() {
    let Deck: Array<CardType> = [];

    for (const color of colorArray) {
        if (color === "Wild") {
            for (const value of wildValueArray) {
                for (let i = 0; i < 4; ++i) {
                    Deck.push({
                        id: Deck.length,
                        color,
                        value
                    });
                }
            }
            continue;
        }

        for (const value of valueArray) {
            Deck.push({ id: Deck.length, color, value });
            if (value !== 0) {
                Deck.push({ id: Deck.length, color, value });
            }
        }
    }

    return randomize(Deck);
}
