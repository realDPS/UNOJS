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
  //When player create a room
  socket.on("createRoom", (id: string) => {
    console.log(`ID of room: ${id}`);
    console.log("new room created!");
    socket.join(id);
  });

  //When new player join existing room
  socket.on("joinRoom", (id, username) => {
    if (io.sockets.adapter.rooms.has(id)) {
      if (io.sockets.adapter.rooms.get(id).size < 3) {
        socket.join(id);
        console.log(`${username} joined room ID: ${id}`);
        io.in(id).emit("joined", username);

        //REMOVE PLAYER FROM ROOM
        socket.on("removePlayer", () => {
          console.log("Room full,", username, " removed");
          socket.leave(id);
        });
      } else {
        const msg = "Room size limit reached";
        console.log(username, " refused");

        io.in(id).emit("refused", msg);
      }
    }
  });

  socket.on("exceedingPlayer", (name: string, id) => {
    io.in(id).emit("removePlayer", name);
  });
  socket.on("removePlayer", (name: string, id) => {
    console.log("removed ", name);
    socket.leave(id);
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

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
