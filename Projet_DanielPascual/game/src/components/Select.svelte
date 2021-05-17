<script>
	export let label = "Select";
	export let value;
	export let options = [{ id: 0, value: "1", text: "Option 1" }];
</script>

<style>
	.select {
		font-family: "Roboto", "Helvetica", "Arial", sans-serif;
		position: relative;
	}

	.select-text {
		position: relative;
		background-color: transparent;
		width: 100%;
		padding: 10px 10px 10px 0;
		font-size: 18px;
		border-radius: 0;
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	}

	/* Remove focus */
	.select-text:focus {
		outline: none;
	}

	/* Use custom arrow */
	.select .select-text {
		height: 100%;
		appearance: none;
	}

	.select:after {
		position: absolute;
		top: 18px;
		right: 10px;
		/* Styling the down arrow */
		width: 0;
		height: 0;
		padding: 0;
		content: "";
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 6px solid rgba(0, 0, 0, 0.12);
		pointer-events: none;
	}

	/* LABEL ======================================= */
	.select-label {
		color: #999;
		font-size: 18px;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		top: 10px;
		transition: 0.2s ease all;
	}

	/* active state */
	.select-text:focus ~ .select-label,
	.select-text:valid ~ .select-label {
		color: #326dbf;
		top: -20px;
		transition: 0.2s ease all;
		font-size: 14px;
	}

	/* BOTTOM BARS ================================= */
	.select-bar {
		position: relative;
		display: block;
		width: 100%;
	}

	.select-bar:before,
	.select-bar:after {
		content: "";
		height: 2px;
		width: 0;
		bottom: 1px;
		position: absolute;
		background: #326dbf;
		transition: 0.2s ease all;
	}

	.select-bar:before {
		left: 50%;
	}

	.select-bar:after {
		right: 50%;
	}

	/* active state */
	.select-text:focus ~ .select-bar:before,
	.select-text:focus ~ .select-bar:after {
		width: 50%;
	}

	select option:disabled {
		display: none;
	}
</style>

<div class="select">
	<select class="select-text" required bind:value autocomplete>
		<option value="" disabled selected />
		{#each options as option, _index (option.id)}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>

	<span class="select-bar" />
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="select-label">{label}</label>
</div>
