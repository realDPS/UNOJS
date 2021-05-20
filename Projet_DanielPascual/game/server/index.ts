import express from "express";

import cors from "cors";
import { Server } from "socket.io";
import {
  getRandomCard,
  getRandomValue,
  randomize,
  getRandomColor,
  generateDeck
} from "./deckLogic";

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

io.on("connection", (socket) => {
  console.log(`Socket Connection Established for Client ${socket.id}`);
  console.log(io.sockets.adapter.rooms);

  //When player create a room
  socket.on("createRoom", (id: string) => {
    console.log(`ID of room: ${id}`);
    console.log("new room created!");
    socket.join(id);
    console.log(io.sockets.adapter.rooms);
  });

  //When new player join existing room
  socket.on("joinRoom", (roomID, username) => {
    //ID,
    if (io.sockets.adapter.rooms.has(roomID)) {
      socket.join(roomID);
      console.log(io.sockets.adapter.rooms);
      console.log(io.sockets.adapter.rooms.get(roomID).size);
      console.log(`${username} joined room roomID: ${roomID}`);
      io.in(roomID).emit("joined", username); //ID,
    } else {
      console.log("room doesn't exist");
      socket.emit("noroom", "This room doesn't exist");
    }
  });

  socket.on("accept", (id, name, status) => {
    io.in(id).emit("accepted", status);
    if (!status) {
      console.log("Player number exceeded");
      io.in(id).emit("denied", name);
      socket.leave(id);
      console.log("removed ", name);
      console.log(io.sockets.adapter.rooms.get(id).size);
      console.log(io.sockets.adapter.rooms);
    }
  });

  socket.on("update", (state: GameState) => {
    io.in(state.roomID).emit("update", state);
  });

  socket.on("newHand", (hand) => {
    socket.emit("enemyHandSize", hand);
  });

  socket.on("endTurn", (id) => {
    //TODO: change yourTurn of players
  });

  socket.on("topCard", (card) => {
    socket.emit("topCard", card);
  });
  socket.on("updateDeck", (deck) => {
    socket.emit("updateDeck", deck);
  });

  socket.on("disconnect", (ID) => {
    console.log(ID, " LEFT");

    socket.emit("test");
    console.log(socket.id, " LEFT");
    console.log(io.sockets.adapter.rooms);
    socket.emit("playerLeft", ID);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
