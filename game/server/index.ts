import express from "express";

import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import {
  getRandomCard,
  getRandomValue,
  randomize,
  getRandomColor,
  generateDeck
} from "./deckLogic.js";

const app = express();
const httpServer = require("http").createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(
  cors({
    origin: "localhost"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

io.on("connection", (socket) => {
  console.log(`Socket Connection Established for Client ${socket.id}`);
  console.log(io.sockets.adapter.rooms);

  //When player create a room
  socket.on("createRoom", (id: string) => {
    socket.join(id);
    //console.log(io.sockets.adapter.rooms);
    socket.emit("initialDeck", generateDeck());
  });

  //When new player join existing room
  socket.on("joinRoom", (roomID, username) => {
    //ID,
    if (io.sockets.adapter.rooms.has(roomID)) {
      socket.join(roomID);
      //console.log(io.sockets.adapter.rooms);
      //console.log(io.sockets.adapter.rooms.get(roomID).size);
      //console.log(`${username} joined room roomID: ${roomID}`);
      io.in(roomID).emit("joined", username, socket.id); //ID,
    } else {
      console.log("room doesn't exist");
      socket.emit("noroom", "This room doesn't exist");
    }
  });

  socket.on("accept", (id, name, status) => {
    if (status) {
      console.log("accepted ", id);

      io.in(id).emit("accepted", status);
    } else {
      console.log("Room exceeded, ", name, "(", id, ") removed");

      io.in(id).emit("accepted", status);
    }
  });

  socket.on("leave", (ID: string) => {
    socket.leave(ID);
  });

  socket.on("update", (state: GameState) => {
    console.log("emited update");

    io.in(state.roomID).emit("update", state);
  });
  socket.on("updateState", (state: GameState) => {
    state.drawDeck = randomize(state.drawDeck);
    io.in(state.roomID).emit("updateState", state);
  });

  socket.on("disconnect", (reason) => {
    console.log(io.sockets.adapter.rooms);
    console.log(socket.id, " LEFT");
    io.sockets.emit("playerLeft", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
