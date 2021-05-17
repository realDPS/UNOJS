import express from "express";
import { v4 as uuidv4 } from "uuid";
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
const deck = generateDeck();

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

  socket.on("newRoom", (GameState) => {
    const roomID = uuidv4();
    socket.join(roomID);
    rooms.set(roomID, GameState);
    console.log("new room created!", roomID);

    socket.emit("roomIdCreated", roomID);
  });

  socket.on("join", ({ id, username }) => {
    socket.join(id);

    let player = {} as PlayerData;
    player.username = username;

    rooms.get(id).players.push(player);
    console.log(username, " joined ", rooms.get(id));
    socket.emit("joined", rooms.get(id));
  });

  socket.on("gameStart", (id) => {
    rooms.get(id).drawDeck = randomize(deck);
    socket.emit("gameStarted", rooms.get(id));
  });

  socket.on("newHand", (hand) => {
    socket.emit("enemyHandSize", hand);
    console.log(socket.rooms);
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
