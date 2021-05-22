<style>
	.spinner-container {
		display: block;
		height: 200px;
		position: relative;
		letter-spacing: 0.5px;
	}

	.spinner::after {
		content: "";
		box-sizing: border-box;
		width: 40px;
		height: 40px;
		position: absolute;
		top: calc(50% - 20px);
		left: calc(50% - 20px);
		border-radius: 50%;
	}

	.spinner.smooth::after {
		border-top: 4px solid #326dbf;
		border-left: 4px solid #326dbf;
		border-right: 4px solid transparent;
		animation: spinner 0.6s linear infinite;
	}

	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}
</style>

<div class="spinner-container">
	<span class="smooth spinner" />
</div>
