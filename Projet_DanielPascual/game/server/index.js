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
var room = [];
app.use(cors_1["default"]({
    origin: "localhost"
}));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
// express.static(path.join(__dirname, "..", "public/"));
// app.use(express.static("public"));
app.post("/gamestate", function (req, res) {
    console.log(req.body);
    res.send({
        message: "Received JSON"
    });
});
app.get("/:penis", function (req, res) {
    console.log();
});
io.on("connection", function (socket) {
    console.log("Connected");
    var id = uuid_1.v4();
    room.push(id);
    socket.emit("newRoom", id);
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
console.log(uuid_1.v4());
