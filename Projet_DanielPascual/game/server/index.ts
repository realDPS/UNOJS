import express from "express";

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
  console.log(socket.id);

  //When player create a room
  socket.on("newRoom", () => {
    const deck = generateDeck();
    console.log("new room created!");

    socket.emit("initialDeck", deck);
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

  socket.on("newHand", (hand) => {
    socket.emit("enemyHandSize", hand);
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

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
