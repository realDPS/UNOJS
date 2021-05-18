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
		if (socket.rooms[id]) {
			socket.join(id);
			console.log(`${username} joined room ID: ${id}`);
		}

		let player = {} as PlayerData;
		player.username = username;
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
