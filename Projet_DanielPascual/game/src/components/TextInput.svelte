<script lang="ts">
	export let value = "";
	export let label = "TextInput";
	export let autofocus = false;
	export let maxlength;
</script>

<style>
	.group {
		font-family: "Roboto", "Helvetica", "Arial", sans-serif;
		position: relative;
	}
	input {
		font-size: 18px;
		padding: 10px 0;
		display: block;
		width: 100%;
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
		background-color: transparent;
	}
	input:focus {
		outline: none;
	}

	/* LABEL ======================================= */
	label {
		color: #999;
		font-size: 18px;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		top: 10px;
		transition: 0.2s ease all;
	}

	/* active state */
	input:focus ~ label,
	input:valid ~ label {
		top: -20px;
		font-size: 14px;
		color: #326dbf;
	}

	/* BOTTOM BARS ================================= */
	.bar {
		position: relative;
		display: block;
		width: 100%;
	}
	.bar:before,
	.bar:after {
		content: "";
		height: 2px;
		width: 0;
		bottom: 1px;
		position: absolute;
		background: #326dbf;
		transition: 0.2s ease all;
		-moz-transition: 0.2s ease all;
		-webkit-transition: 0.2s ease all;
	}
	.bar:before {
		left: 50%;
	}
	.bar:after {
		right: 50%;
	}

	/* active state */
	input:focus ~ .bar:before,
	input:focus ~ .bar:after {
		width: 50%;
	}
</style>

<div class="group">
	<!-- svelte-ignore a11y-autofocus -->
	<input type="text" required bind:value {autofocus} on:blur {maxlength} />
	<span class="bar" />
	<label for="">{label}</label>
</div>
