<script lang="ts">
	import { GameState, ID } from "@store";
	import { socket } from "../App.svelte";

	export let player: number;
	export let position: Position;

	$: PlayerCards = $GameState.players[player].cardArray;

	let NEXTPLAYER: number;

	function nextPlayerTurn(jump: number = 1) {
		const direction = $GameState.isClockwise ? 1 : -1;
		NEXTPLAYER =
			(player + direction * jump + $GameState.numOfPlayers) %
			$GameState.numOfPlayers;
	}
	function aiPlay() {
		const copy = [...$GameState.players[player].cardArray];
		const hand = [...copy].sort(() => Math.random() - 0.5);

		for (let index = 0; index < hand.length; index++) {
			const clickedCard = hand[index];
			const { color, value } = clickedCard;

			if (
				color === "Wild" ||
				color === $GameState.currentColor ||
				value === $GameState.topCard.value
			) {
				discardCard({ detail: index });
				return;
			}
		}
	}

	function discardCard({ detail: index }: { detail: number }) {
		const clickedCard = $GameState.players[player].cardArray[index];
		const { color, value } = clickedCard;

		if (
			color === "Wild" ||
			color === $GameState.currentColor ||
			value === $GameState.topCard.value
		) {
			$GameState.players[player].cardArray.splice(index, 1);
			$GameState.players[player].cardArray = [
				...$GameState.players[player].cardArray,
			];
			$GameState.drawDeck.push($GameState.topCard);

			nextPlayerTurn();

			switch (value) {
				case "Draw":
					$GameState.players[NEXTPLAYER].drewCard = true;
					// nextPlayerTurn(2);
					break;
				case "Reverse":
					$GameState.isClockwise = !$GameState.isClockwise;
					break;
				case "Skip":
					nextPlayerTurn(2);
					break;
			}

			if ($GameState.numOfPlayers === 2) {
				if (value === "Reverse") nextPlayerTurn(2);
			}

			$GameState.previousPlayer = player;
			$GameState.topCard = clickedCard;

			if (color != "Wild") $GameState.currentColor = color;
			else {
				const copy = $GameState.players[player].cardArray.filter(
					(card) => card.color !== "Wild",
				);
				$GameState.currentColor = copy[0].color;
			}

			//winner
			if ($GameState.players[player].cardArray.length == 0) {
				$GameState.winner = $GameState.players[player].username;
			}

			//next player
			$GameState.players[player].turnToPlay = false;
			$GameState.players[NEXTPLAYER].turnToPlay = true;
			$GameState.currentPlayer = NEXTPLAYER;
			socket.emit("updateState", $GameState);
		}
	}
	$: console.log("Player:", player, " ", $GameState.players[player].turnToPlay);
	$: if ($GameState.players[player].turnToPlay) {
		setTimeout(() => {
			aiPlay();
		}, 700);
	}
</script>
