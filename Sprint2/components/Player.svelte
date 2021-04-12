<script lang="ts">
	import { GameState } from "../store";
	import Cards from "./Cards.svelte";

	// export let username: string;
	export let player: PlayerType;

	// let playerNumber: number;
	let yourTurn: boolean;
	$: PlayerCards = $GameState.players[player].cardArray;

	function discardCard({ detail: index }: { detail: number }) {
		const clickedCard = $GameState.players[player].cardArray[index];
		const { color, value } = clickedCard;

		if (
			color === "Wild" ||
			$GameState.discardPile[$GameState.discardPile.length - 1].color ===
				"Wild" ||
			color ===
				$GameState.discardPile[$GameState.discardPile.length - 1].color ||
			value === $GameState.discardPile[$GameState.discardPile.length - 1].value
		) {
			$GameState.players[player].cardArray.splice(index, 1); // Original array is mutated
			//This is to circumvent Svelte limitation:
			$GameState.players[player].cardArray = [
				...$GameState.players[player].cardArray
			]; // Re-assign cardArray with an array of itself.
			$GameState.discardPile.push(clickedCard);
			// console.log($GameState.players[0].cardArray);
		}

		// $GameState.currentPlayer =
		// 	$GameState.currentPlayer === 3
		// 		? 0
		// 		: (($GameState.currentPlayer + 1) as PlayerType);
	}
</script>

<style>
	.Player {
		display: flex;
		z-index: 2;
	}
</style>

<div class="Player">
	{#each PlayerCards as { id, color, value }, index (id)}
		<Cards {color} {value} animation="Peek" {index} on:discard={discardCard} />
	{/each}
</div>
