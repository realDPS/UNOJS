type Color = "Blue" | "Red" | "Green" | "Yellow" | "Special"

type Value = 0|1|2|3|4|5|6|7|8|9 | "Reverse" | "+2" | "Skip"

type PlayerType = "one" | "two" | "three" | "four"

type Position = "Top" | "Right" | "Left" | "User"

type Order = "clockwise" | "anti-clockwise"

interface GameState {
    turn : Player,
    order: Order,
    uno: Player | null,
}
