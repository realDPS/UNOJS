import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { Server } from "socket.io"

const app = express();
const httpServer = require("http").createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

const PORT = 3000;

let room = {}


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

  socket.on("newRoom", () => {
    const roomID = uuidv4();
    socket.join(roomID);
    room.push(roomID);
    socket.emit("newRoom", roomID);
  });

  socket.on("join", (id) => {
    socket.join(id);
    const gameState = null;
    room[id]
    //need to defined user nb and gameState
    socket.emit("joined", gameState);
  })

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

console.log(uuidv4());
