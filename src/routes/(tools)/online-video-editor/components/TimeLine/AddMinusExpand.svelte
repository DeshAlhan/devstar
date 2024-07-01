<script>

	import Img from "../../Img.svelte";


</script>

<div class="div-35">
	<Img
		alt="img2"
		loading="lazy"
		srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a4dc91cd83d94d273607361321345f13ec32e004984b060cdce7a5790cf4220a?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
		className="img -16"
	/>
	<Img
		alt="img2"
		loading="lazy"
		srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bd0a0819fd5cd936ce31928f76365dcacc885f72acd563c41efae4bbe6ab4ce9?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
		className="img -16"
	/>
	<Img
		alt="img2"
		loading="lazy"
		srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/056927719f76dba329da04238fcc6e691af52927f133c0ef80ba480f4e0e899d?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
		className="img -16"
	/>
</div>

<style>
	.div-35 {
		justify-content: end;
		display: flex;
		padding-left: 80px;
		gap: 20px;
	}

	@media (max-width: 991px) {
		.div-35 {
			flex-wrap: wrap;
		}
	}
</style>
