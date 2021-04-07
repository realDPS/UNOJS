type Color = "Blue" | "Red" | "Green" | "Yellow" | "Wild"

type Value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "Reverse" | "Draw" | "Skip" | "CC"

interface CardType {
    value?: Value
    color?: Color
}

type Player = "One" | "Two" | "Three" | "Four"

interface PlayerData { cardArray: Array<CardType>, turnToPlay: boolean, uno: boolean, drewCard: boolean, }

type Position = "Top" | "Right" | "Left" | "User"

type Order = "clockwise" | "anti-clockwise"

interface GameState {
    playerTurn: Player,
    order: Order,
    uno: boolean,
    players: Array<PlayerData>
    drawDeck: Array<CardType>
    discardPile: Array<CardType>
}

type AnimationType = "Pulse" | "Peek" | "None"

