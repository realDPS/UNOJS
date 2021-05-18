<script lang="ts">
	import { fly } from "svelte/transition";
	import { GameState } from "@store";

	import Spinner from "../Spinner.svelte";
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
	<h6>Waiting 1/{$GameState.numOfPlayers} players</h6>
	<Spinner />
</div>
