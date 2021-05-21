<script lang="ts">
	import { fly } from "svelte/transition";
	import { GameState, username } from "@store";
	import Spinner from "../Spinner.svelte";
	import { socket } from "../../App.svelte";

	$: if (
		$GameState.players[$GameState.numOfPlayers - 1] !== undefined &&
		$GameState.players[$GameState.numOfPlayers - 1].cardArray.length === 7
	) {
		$GameState.gameStarted = true;
		console.log($GameState);
	}

	$: console.log("GameStart: ", $GameState.gameStarted);

	socket.on("joined", (name: string, ID: string) => {
		//Only gameMaster can continue operation
		if ($GameState.players[0].username === $username) {
			if ($GameState.players.length < $GameState.numOfPlayers) {
				//give hand to new player
				const hand: Array<CardType> = [];
				console.log(">>", $GameState);

				for (let index = 0; index < 7; index++) {
					hand.push($GameState.drawDeck.pop());
				}
				socket.emit("updateDeck", $GameState.drawDeck);

				$GameState.players[$GameState.players.length] = {
					...$GameState.players[0],
					id: ID,
					cardArray: hand,
					handLength: hand.length,
					username: name,
					turnToPlay: false
				};
				console.log(name, " joined");
				socket.emit("accept", $GameState.roomID, name, true);
				socket.emit("update", $GameState);
			} else {
				socket.emit("accept", ID, name, false);
			}
		}
	});

	socket.on("initialDeck", (deck: CardType[]) => {
		const hand: Array<CardType> = [];
		$GameState.drawDeck = deck;
		for (let index = 0; index < 7; index++) {
			hand.push($GameState.drawDeck.pop());
		}
		$GameState.players[0].cardArray = hand;
	});

	socket.on("update", (state: GameState) => {
		if ($GameState.players[0].username !== $username) {
			$GameState = state;
			console.log($GameState);
		}
	});

	socket.on("updateDeck", (deck: CardType[]) => {
		$GameState.drawDeck = deck;
	});

	socket.on("playerLeft", (ID) => {
		console.log("player left room:", ID);

		if ($GameState.players[0].username === $username)
			for (let index = 0; index < $GameState.players.length; index++) {
				const player = $GameState.players[index];

				if (player.id == ID) {
					$GameState.players.splice(index, 1);
					console.log("updated:", $GameState);
					socket.emit("update", $GameState);
					return;
				}
			}
	});
</script>

<style>
	.Container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		height: 100%;
		width: 100%;
		flex-direction: column;
		justify-content: space-evenly;
		text-align: center;
	}

	h1 {
		color: #326dbf;
	}
</style>

<div
	class="Container"
	in:fly={{ x: 200, duration: 250 }}
	out:fly={{ x: -200, duration: 250 }}>
	<h1>Waiting for Other Players...</h1>
	<h3>{$GameState.roomID}</h3>
	<h5>Copy this ID to invite other players...</h5>
	<h6>Waiting {$GameState.players.length}/{$GameState.numOfPlayers} players</h6>
	<Spinner />
</div>
