<script>
	import VideoFames from "./VideoFames.svelte";

	import Time from "./Time.svelte";

	import AddMinusExpand from "./AddMinusExpand.svelte";

	import TimeLineTools from "./TimeLineTools.svelte";
	
</script>

<div class="div-31">
	<div class="div-32">
		<TimeLineTools></TimeLineTools>

		<div class="div-34">00:00:00 / 00:15:22</div>

		<AddMinusExpand></AddMinusExpand>
	</div>

	<Time></Time>
	<VideoFames></VideoFames>
</div>

<style>
	.div-31 {
		background-color: #1d1920;
		display: flex;
		flex-direction: column;
		padding: 16px 0 16px 24px;
	}

	@media (max-width: 991px) {
		.div-31 {
			max-width: 100%;
			padding-left: 20px;
		}
	}

	.div-32 {
		justify-content: space-between;
		display: flex;
		padding-right: 24px;
		gap: 10px;
	}

	@media (max-width: 991px) {
		.div-32 {
			flex-wrap: wrap;
			padding-right: 20px;
		}
	}

	.div-34 {
		color: var(--White-1, #fff);
		text-align: center;
		margin: auto 0;
		font:
			600 14px/143% Inter,
			sans-serif;
	}

	@media (max-width: 991px) {
		.div-34 {
			max-width: 100%;
		}
	}
</style>
