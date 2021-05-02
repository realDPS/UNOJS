var express = require("express");
var cors = require("cors");
var path = require("path");
var app = express();
var httpServer = require("http").createServer(app);
var io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
var PORT = 3000;
var games = [];
app.use(cors({
    origin: "localhost"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static(path.join(__dirname, "..", "public/"));
// app.use(express.static("public"));
app.post("/gamestate", function (req, res) {
    console.log(req.body);
    res.send({
        message: "Received JSON"
    });
});
io.on("connection", function (socket) {
    console.log("Connected");
    socket.on("newHand", function (info) {
        console.log(info);
        socket.emit("enemyHandSize", info);
    });
    socket.on("topCard", function (card) {
        console.log(card);
        socket.emit("topCard", card);
    });
    socket.on("updateDeck", function (deck) {
        console.log(deck);
        socket.emit("updateDeck", deck);
    });
});
httpServer.listen(PORT, function () {
    console.log("listening on: " + PORT);
});
