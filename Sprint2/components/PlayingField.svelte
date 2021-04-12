<script lang="ts">
	import { GameState } from "../store";
	import Cards from "./Cards.svelte";

	$: DrawDeck = $GameState.drawDeck;
	$: DiscardPile = $GameState.discardPile;
	$: topCard = DiscardPile[DiscardPile.length - 1];
	// $: console.log(DiscardPile);

	$: if ($GameState.discardPile[DiscardPile.length - 1].value === "Draw") {
		switch ($GameState.discardPile[DiscardPile.length - 1].color) {
			case "Wild":
				console.log("Change Color and Draw 4 Cards");
				for (let i = 0; i < 4; ++i) {
					drawCard();
				}
				console.log($GameState.players[$GameState.currentPlayer].cardArray);
				break;
			default:
				console.log("Draw 2 Cards");
				for (let i = 0; i < 2; ++i) {
					drawCard();
				}
				console.log($GameState.players[$GameState.currentPlayer].cardArray);
				break;
		}
	}

	function drawCard() {
		const Card = DrawDeck.shift();
		$GameState.players[$GameState.currentPlayer].cardArray[
			$GameState.players[$GameState.currentPlayer].cardArray.length
		] = Card;
		console.log($GameState.players[$GameState.currentPlayer].cardArray);
	}

	$GameState.discardPile[0] = $GameState.drawDeck.shift();
</script>

<style>
</style>

<div>
	{#if DrawDeck.length !== 0}
		<div id="drawDeck" on:click={drawCard}>
			<Cards faceDown={true} />
		</div>
	{/if}
	<div id="discardPile">
		{#if DiscardPile.length > 0}
			<Cards value={topCard.value} color={topCard.color} />
		{/if}
	</div>
</div>
