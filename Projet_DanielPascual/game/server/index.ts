import express from "express";
import { stringify, v4 as uuidv4 } from "uuid";
import cors from "cors";
import { Server } from "socket.io";
import { GameState } from "../src/store";
import {
  getRandomCard,
  getRandomValue,
  randomize,
  getRandomColor,
  generateDeck
} from "./DeckLogic";

const app = express();
const httpServer = require("http").createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

const PORT = 3000;

let rooms: Map<string, GameState> = new Map();

app.use(
  cors({
    origin: "localhost"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/gamestate", (req, res) => {
  console.log(req.body);
  res.send({
    message: "Received JSON"
  });
});

// app.get("/:test", (req, res) => {
//   console.log();
// })

io.on("connection", (socket) => {
  console.log("Connected");

  //When player create a room
  socket.on("newRoom", (GameState) => {
    const roomID = uuidv4();
    const deck = generateDeck();

    socket.join(roomID);
    rooms.set(roomID, GameState);
    rooms.get(roomID).drawDeck = deck;

    console.log("new room created!", roomID);
    console.log("game's deck:", deck);

    socket.emit("roomIdCreated", roomID, deck);
  });

  //When new player join existing room
  socket.on("join", ({ id, username }) => {
    socket.join(id);

    let player = {} as PlayerData;
    player.username = username;

    rooms.get(id).players.push(player);
    console.log(username, " joined ", rooms.get(id));
    socket.emit("joined", rooms.get(id));
  });

  //Create initial GameState's deck
  socket.on("createDeck", (id) => {
    console.log("wtf bitch");
    // rooms.get(id).drawDeck = generateDeck();
    // console.log(rooms.get(id).drawDeck);
    // socket.emit("deckCreated", rooms.get(id));
  });

  socket.on("newHand", (hand) => {
    socket.emit("enemyHandSize", hand);
    console.log(socket.rooms);
  });

  socket.on("endTurn", (id) => {
    //TODO: change yourTurn of players
    randomize(rooms.get(id).drawDeck);
    socket.emit("nextTurn", rooms.get(id).drawDeck);
  });

  socket.on("topCard", (card) => {
    socket.emit("topCard", card);
  });
  socket.on("updateDeck", (deck) => {
    socket.emit("updateDeck", deck);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
