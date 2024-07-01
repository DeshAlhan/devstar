<script>
	// Define the segments of time to display
	const segments = [
		"0",
		"0:02",
		"0:04",
		"0:06",
		"0:08",
		"0:10",
		"0:12",
		"0:14",
		"0:16",
		"0:18",
		"0:20",
		"0:22",
	];
</script>

<div class="timeline">
	{#each segments as segment, i}
		<div class="segment">
			<div class="divider" />
			<div class="time">{segment}</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		display: flex;
		margin-top: 16px;
		width: 100%;
		padding-right: 28px;
		gap: 20px;
		font-size: 10px;
		color: var(--Gray-1, #9ca3af);
		font-weight: 400;
		white-space: nowrap;
		line-height: 120%;
		justify-content: space-between;
	}

	@media (max-width: 991px) {
		.timeline {
			max-width: 100%;
			flex-wrap: wrap;
			padding-right: 20px;
			white-space: initial;
		}
	}

	.segment {
		display: flex;
		gap: 3px;
	}

	@media (max-width: 991px) {
		.segment {
			white-space: initial;
		}
	}

	.divider {
		border-color: rgba(156, 163, 175, 1);
		border-style: solid;
		border-width: 1px;
		background-color: #9ca3af;
		width: 1px;
		height: 20px;
	}

	.time {
		font-family: Inter, sans-serif;
		margin: auto 0;
	}
</style>
