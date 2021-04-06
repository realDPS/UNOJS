export function CardGenerator() {
    let valueGen: Value, colorGen: Color;
    let colorArray: Array<Color> = ["Blue", "Red", "Green", "Yellow", "Wild"];

    let valueArray: Array<Value> = [
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
        "Skip",
    ];

    let wildValue: Array<Value> = ["Draw", "CC"];

    colorGen = colorArray[Math.floor(Math.random() * colorArray.length)];
    if (colorGen === "Wild") {
        valueGen = wildValue[Math.floor(Math.random() * wildValue.length)];
    } else {
        valueGen = valueArray[Math.floor(Math.random() * valueArray.length)];
    }

    return { colorGen, valueGen } as any;
}

export function getCard() {
    let { colorGen, valueGen } = CardGenerator();
    let color = colorGen, value = valueGen;
    return { color, value } as Card;

}