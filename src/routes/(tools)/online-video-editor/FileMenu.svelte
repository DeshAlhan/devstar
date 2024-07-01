<script>
	import { onMount } from 'svelte';
	import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { library, dom } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	library.add(faTrash, faPlus);
	dom.watch();

	let selectedCategory = 'All';
	let importedMedia = [];

	function handleCategoryClick(category) {
		selectedCategory = category;
	}

	function handleFileImport(event) {
		const files = Array.from(event.target.files);
		importedMedia = [...importedMedia, ...files];
	}

	function getFileType(file) {
		if (file.type.startsWith('video/')) return 'video';
		if (file.type.startsWith('audio/')) return 'audio';
		if (file.type.startsWith('image/')) return 'image';
		return 'other';
	}

	function deleteMediaItem(index) {
		importedMedia = importedMedia.filter((_, i) => i !== index);
	}
</script>

<div class="div-16">
	<div class="div-17">
		<button 
			class="div-18 {selectedCategory === 'All' ? 'active' : ''}" 
			on:click={() => handleCategoryClick('All')}
		>All</button>
		<button 
			class="div-19 {selectedCategory === 'Videos' ? 'active' : ''}" 
			on:click={() => handleCategoryClick('Videos')}
		>Videos</button>
		<button 
			class="div-20 {selectedCategory === 'Audio' ? 'active' : ''}" 
			on:click={() => handleCategoryClick('Audio')}
		>Audio</button>
		<button 
			class="div-21 {selectedCategory === 'Images' ? 'active' : ''}" 
			on:click={() => handleCategoryClick('Images')}
		>Images</button>
	</div>
	<label class="div-22" for="fileInput">Import Media</label>
	<input 
		id="fileInput" 
		type="file" 
		accept="video/*,audio/*,image/*" 
		multiple 
		on:change={handleFileImport} 
		style="display: none;"
	/>
	{#each importedMedia as file, index (file.name)}
		<div class="media-item">
			{#if getFileType(file) === 'image'}
				<img
					alt=""
					loading="lazy"
					src={URL.createObjectURL(file)}
					class="img-2"
				/>
			{:else if getFileType(file) === 'video'}
				<video
					controls
					src={URL.createObjectURL(file)}
					class="video-preview"
				></video>
			{:else if getFileType(file) === 'audio'}
				<audio
					controls
					src={URL.createObjectURL(file)}
					class="audio-preview"
				></audio>
			{:else}
				<div class="unknown-preview">
					<p>Unsupported file type</p>
				</div>
			{/if}
			<div class="div-23">{file.name}</div>
			<div class="icon-container">
				<button class="icon-button" on:click={() => deleteMediaItem(index)}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
				<button class="icon-button" on:click={() => document.getElementById('fileInput').click()}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.div-16 {
		background-color: #413946;
		display: flex;
		width: 100%;
		flex-grow: 1;
		flex-direction: column;
		color: var(--White-1, #fff);
		font-weight: 600;
		margin: 0 auto;
		padding: 16px;
		max-height: 500px; /* Set a maximum height */
		overflow-y: auto; /* Enable vertical scrolling */
	}

	.div-17 {
		display: flex;
		gap: 16px;
		font-size: 14px;
		color: var(--Gray-1, #9ca3af);
		white-space: nowrap;
		line-height: 143%;
	}

	@media (max-width: 991px) {
		.div-17 {
			white-space: initial;
		}
	}

	.div-18, .div-19, .div-20, .div-21 {
		font-family: Inter, sans-serif;
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px 10px;
		border-radius: 4px;
		transition: background-color 0.3s, color 0.3s;
	}

	.div-18:hover, .div-19:hover, .div-20:hover, .div-21:hover {
		background-color: #2f2b34;
	}

	.active {
		background-color: #078060;
		color: white;
	}

	.div-22 {
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		background-color: var(--Primary, #078060);
		margin-top: 16px;
		text-align: center;
		padding: 12px 16px;
		font: 16px/150% Inter, sans-serif;
		cursor: pointer;
	}

	@media (max-width: 991px) {
		.div-22 {
			padding: 0 20px;
		}
	}

	.div-23 {
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 4px;
		font: 400 10px/120% Inter, sans-serif;
	}

	@media (max-width: 991px) {
		.div-23 {
			white-space: initial;
		}
	}

	.media-item {
		margin-top: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.video-preview, .audio-preview {
		width: 100%;
		max-width: 600px;
		margin-top: 10px;
	}

	.img-2 {
		width: 100%;
		max-width: 600px;
		margin-top: 10px;
	}

	.unknown-preview {
		color: var(--Gray-1, #9ca3af);
		font-size: 14px;
		margin-top: 10px;
	}

	.icon-container {
		display: flex;
		gap: 10px;
		margin-top: 10px;
	}

	.icon-button {
		background: none;
		border: none;
		color: #fff;
		cursor: pointer;
		font-size: 18px;
	}

	.icon-button:hover {
		color: #ff0000;
	}

	.icon-button .fas {
		pointer-events: none;
	}
</style>
