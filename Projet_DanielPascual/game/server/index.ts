import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { Server } from "socket.io";
import { GameState } from "../src/store";

const app = express();
const httpServer = require("http").createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

const PORT = 3000;

// let room = {}
let rooms = new Map();
// let roomID = "room1", GameState = "stateTest";
// rooms.set(roomID, GameState);
// rooms.get(roomID);

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
    //todo: add an joined emit
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

console.log(uuidv4());

const ENEMIES_POSITION = { right: null, top: null, left: null };

//Will check numbers of players and organize each client's enemies' position
function gameStart(id) {
  const players = rooms.get(id).players;
  switch (players.length) {
    case 2:
      mode2players(players);
      break;
    case 3:
      mode3players(players);
      break;
    case 4:
      mode4players(players);
      break;
  }
}

function mode2players(playerArray) {
  let index = 0,
    enemies,
    target;

  playerArray.forEach((player) => {
    //In JS, objects are passed and assigned by reference
    enemies = Object.assign({}, ENEMIES_POSITION);
    target = player.username;

    enemies.top = playerArray[index].username;
    //emit...
    index++;
  });
}

function mode3players(playerArray) {
  let index = 0,
    enemies,
    target;

  playerArray.forEach((player) => {
    let enemies = Object.assign({}, ENEMIES_POSITION);
    let target = player.username;

    switch (index) {
      case 0:
        enemies.right = playerArray[1].username;
        enemies.left = playerArray[2].username;
        break;
      case 1:
        enemies.right = playerArray[2].username;
        enemies.left = playerArray[0].username;
        break;
      case 2:
        enemies.right = playerArray[0].username;
        enemies.left = playerArray[1].username;
        break;
    }
    //emit object with target and enemies
    //the client will check if target==username. If yes, use data to configurate other players disposition
    index++;
  });
}

function mode4players(playerArray) {
  let index = 0,
    enemies,
    target;

  playerArray.forEach((player) => {
    target = player.username;
    enemies = Object.assign({}, ENEMIES_POSITION);

    switch (index) {
      case 0:
        enemies.right = playerArray[1].username;
        enemies.top = playerArray[2].username;
        enemies.left = playerArray[3].username;
        break;
      case 1:
        enemies.right = playerArray[2].username;
        enemies.top = playerArray[3].username;
        enemies.left = playerArray[0].username;
        break;
      case 2:
        enemies.right = playerArray[3].username;
        enemies.top = playerArray[0].username;
        enemies.left = playerArray[1].username;
        break;
      case 3:
        enemies.right = playerArray[0].username;
        enemies.top = playerArray[1].username;
        enemies.left = playerArray[2].username;
        break;
    }
    //emit object with target and enemies
    //the client will check if target==username. If yes, use data to configurate other players disposition
    index++;
  });
}
