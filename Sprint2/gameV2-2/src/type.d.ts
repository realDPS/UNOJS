type Color = "Blue" | "Red" | "Green" | "Yellow" | "Wild"

type Value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "Reverse" | "Draw" | "Skip" | "CC"

type Card = {
    value?: Value
    color?: Color
}

type Player = "one" | "two" | "three" | "four"

type PlayerData = { numOfCards: number, turnToPlay: boolean, uno: boolean, drewCard: boolean }

type Position = "Top" | "Right" | "Left" | "User"

type Order = "clockwise" | "anti-clockwise"

interface GameState {
    turn: Player,
    order: Order,
    uno: boolean,
    players: Array<PlayerData>
    topCard: Card
}

type AnimationType = "Pulse" | "Peek" | "None"

