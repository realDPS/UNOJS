type Color = "Blue" | "Red" | "Green" | "Yellow" | "Wild";

type Value =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | "Reverse"
  | "Draw"
  | "Skip"
  | "CC";

interface CardType {
  id: number;
  value?: Value;
  color?: Color;
}

interface PlayerData {
  id: string;
  username: string;
  cardArray: Array<CardType>;
  handLength: number;
  turnToPlay: boolean;
  uno: boolean;
  drewCard: boolean;
}

interface GameState {
  roomID: string;
  gameStarted: boolean;
  currentPlayer: number;
  previousPlayer: number;
  isClockwise: boolean;
  uno: boolean;
  numOfPlayers: number;
  players: Array<PlayerData>;
  drawDeck: Array<CardType>;
  topCard: CardType;
  winner: string;
  currentColor: Color;
}

type AnimationType = "Pulse" | "Peek" | "PeekDown" | "None";

type Position = "Up" | "Down" | "Left" | "Right";
