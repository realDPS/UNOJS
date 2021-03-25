type Color = "Blue" | "Red" | "Green" | "Yellow"

type Value = 0|1|2|3|4|5|6|7|8|9 | "Reverse" | "+2" | "Skip"

type Player = "Player 1" | "Player 2" | "Player 3" | "Player 4"

type Order = "clockwise" | "anti-clockwise"

interface GameState {
    turn : Player,
    order: Order,
    uno: Player | null,
    
}
