"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var DeckLogic_1 = require("./DeckLogic");
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
    console.log(rooms.size);
    //When player create a room
    socket.on("newRoom", function (GameState) {
        var roomID = uuid_1.v4();
        var deck = DeckLogic_1.generateDeck();
        socket.join(roomID);
        rooms.set(roomID, GameState);
        rooms.get(roomID).drawDeck = deck;
        console.log("new room created!", roomID);
        console.log("game's deck:", deck);
        socket.emit("roomCreated", roomID, deck);
    });
    //When new player join existing room
    socket.on("join", function (_a) {
        var id = _a.id, username = _a.username;
        socket.join(id);
        var player = {};
        player.username = username;
        rooms.get(id).players.push(player);
        console.log(username, " joined ", rooms.get(id));
        socket.emit("joined", rooms.get(id));
    });
    //Create initial GameState's deck
    socket.on("createDeck", function (id) {
        console.log("wtf bitch");
        // rooms.get(id).drawDeck = generateDeck();
        // console.log(rooms.get(id).drawDeck);
        // socket.emit("deckCreated", rooms.get(id));
    });
    socket.on("newHand", function (hand) {
        socket.emit("enemyHandSize", hand);
        console.log(socket.rooms);
    });
    socket.on("endTurn", function (id) {
        //TODO: change yourTurn of players
        DeckLogic_1.randomize(rooms.get(id).drawDeck);
        socket.emit("nextTurn", rooms.get(id).drawDeck);
    });
    socket.on("topCard", function (card) {
        socket.emit("topCard", card);
    });
    socket.on("updateDeck", function (deck) {
        socket.emit("updateDeck", deck);
    });
    socket.on("disconnect", function (reason) {
        console.log(reason);
        console.log(rooms.size);
    });
});
httpServer.listen(PORT, function () {
    console.log("listening on: " + PORT);
});
