type Color = "Blue" | "Red" | "Green" | "Yellow" | "Wild";

type Value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "Reverse" | "Draw" | "Skip" | "CC";

interface CardType {
    id: number;
    value?: Value;
    color?: Color;
}

type PlayerType = 0 | 1 | 2 | 3;

interface PlayerData { username: String, cardArray: Array<CardType>, handLength: number, turnToPlay: boolean, uno: boolean, drewCard: boolean }

type Position = "Top" | "Right" | "Left" | "User";

type Order = "clockwise" | "anti-clockwise";

interface GameState {
    currentPlayer: PlayerType,
    order: Order,
    uno: boolean,
    players: Array<PlayerData>;
    drawDeck: Array<CardType>;
    topCard: CardType;
    drawCard: boolean
}

type AnimationType = "Pulse" | "Peek" | "None";

type DataPlayer = { playerNumber: PlayerType, numOfCards: number }
type DataDeck = Array<CardType>