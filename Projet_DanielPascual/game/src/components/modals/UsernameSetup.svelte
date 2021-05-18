<script lang="ts">
	import TextInput from "../TextInput.svelte";
	import Button from "../Button.svelte";
	import { step, username } from "@store";
	import { fly } from "svelte/transition";

	function handleKey(event: KeyboardEvent) {
		if (event.key === "Enter") {
			setUsername();
		}
	}

	function onBlur() {
		if (!$username.trim().length) {
			$username = "";
		}
	}

	function setUsername() {
		if ($username.trim()) {
			$step++;
		}
	}
</script>

<style>
	.Container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
		justify-content: space-evenly;
		align-items: center;
	}
</style>

<svelte:window on:keydown={handleKey} />

<div
	class="Container"
	in:fly={{ x: -200, duration: 250 }}
	out:fly={{ x: -200, duration: 250 }}>
	<TextInput
		label="Username"
		bind:value={$username}
		autofocus
		on:blur={onBlur}
		maxlength={25} />

	<Button text="Continue" on:click={setUsername} />
</div>
