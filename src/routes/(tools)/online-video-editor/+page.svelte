<script>
	import Main from "./Main.svelte";
	import SideBar from "./SideBar.svelte";

</script>

<div class="div">
	<SideBar></SideBar>

	<Main></Main>
</div>

<style>
	.div {
		
		margin-top: -105px;
		margin-left: -47px;
		height: 81%;
		width: 100%;
		background-color: #fff;
		display: flex;
		gap: 0px;
		overflow: hidden;
		position: fixed;
	}

	@media (max-width: 991px) {
		.div {
			flex-wrap: wrap;
		}
	}
</style>
