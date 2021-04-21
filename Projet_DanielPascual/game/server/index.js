const express = require("express");
var cors = require("cors");
const path = require("path");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

const PORT = 3000;
const games = [];

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

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("Draw", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
