
<script>
	export let alt = "";
	export let loading = "lazy";
	export let srcSet = "";
	export let className = "";
</script>


<img
	alt={alt}
	loading={loading}
	srcset={srcSet}
	class={className}
/>


<style>
	img{
		height: inherit;
	}
</style>
