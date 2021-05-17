<script lang="ts">
	import { UsernameSetup, GameSetup } from "./modals";

	let userSetupDone = false;
</script>

<style>
	.Modal {
		display: grid;
		place-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 350px;
		width: 600px;
		border-radius: 15px;
		background-color: #f3f3f7;
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
		overflow: hidden;
		z-index: 10;
	}
</style>

<div class="Modal">
	{#if !userSetupDone}
		<UsernameSetup bind:userSetupDone />
	{:else if userSetupDone}
		<GameSetup />
	{/if}
</div>
