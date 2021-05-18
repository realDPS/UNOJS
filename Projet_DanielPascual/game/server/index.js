"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
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
    console.log(socket.id);
    //When player create a room
    socket.on("newRoom", function () {
        var deck = DeckLogic_1.generateDeck();
        console.log("new room created!");
        socket.emit("initialDeck", deck);
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
    socket.on("newHand", function (hand) {
        socket.emit("enemyHandSize", hand);
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
    });
});
httpServer.listen(PORT, function () {
    console.log("listening on: " + PORT);
});
