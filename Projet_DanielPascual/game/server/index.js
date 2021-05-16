"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var app = express_1["default"]();
var httpServer = require("http").createServer(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
var PORT = 3000;
var rooms = new Map();
app.use(cors_1["default"]({
    origin: "localhost"
}));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.post("/gamestate", function (req, res) {
    console.log(req.body);
    res.send({
        message: "Received JSON"
    });
});
// app.get("/:test", (req, res) => {
//   console.log();
// })
io.on("connection", function (socket) {
    console.log("Connected");
    socket.on("newRoom", function (GameState) {
        var roomID = uuid_1.v4();
        socket.join(roomID);
        rooms.set(roomID, GameState);
        console.log("new room created!", roomID);
        socket.emit("roomIdCreated", roomID);
    });
    socket.on("join", function (_a) {
        var id = _a.id, username = _a.username;
        socket.join(id);
        var player = {};
        player.username = username;
        rooms.get(id).players.push(player);
        console.log(username, " joined ", rooms.get(id));
        socket.emit("joined", rooms.get(id));
        //todo: add an joined emit
    });
    socket.on("newHand", function (hand) {
        socket.emit("enemyHandSize", hand);
        console.log(socket.rooms);
    });
    socket.on("topCard", function (card) {
        socket.emit("topCard", card);
    });
    socket.on("updateDeck", function (deck) {
        socket.emit("updateDeck", deck);
    });
});
httpServer.listen(PORT, function () {
    console.log("listening on: " + PORT);
});
