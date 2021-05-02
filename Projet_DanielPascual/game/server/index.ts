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
const room = [];

app.use(
  cors({
    origin: "localhost"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express.static(path.join(__dirname, "..", "public/"));

// app.use(express.static("public"));

app.post("/gamestate", (req, res) => {
  console.log(req.body);
  res.send({
    message: "Received JSON"
  });
});

app.get("/:penis", (req, res) => {
  console.log();

})

io.on("connection", (socket) => {
  console.log("Connected");
  const id = uuidv4();
  room.push(id)
  socket.emit("newRoom", id);


  socket.on("newHand", (info) => {
    console.log(info);

    socket.emit("enemyHandSize", info);
  });

  socket.on("topCard", (card) => {
    console.log(card);
    socket.emit("topCard", card);
  });
  socket.on("updateDeck", (deck) => {
    console.log(deck);
    socket.emit("updateDeck", deck);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});

console.log(uuidv4());
