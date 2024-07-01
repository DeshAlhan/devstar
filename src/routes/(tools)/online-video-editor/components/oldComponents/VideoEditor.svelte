<script>
    import { onMount } from 'svelte';


    let videoFile;
    let videoUrl = '';
    let videoElement;
    let canvasElement;
    let ctx;

    let startTime = 0;
    let endTime = 0;

    let overlayText = '';
    let filter = '';

    function handleFileInput(event) {
        const file = event.target.files[0];
        if (file) {
            videoUrl = URL.createObjectURL(file);
        }
    }

    function playVideo() {
        videoElement.play();
    }

    function pauseVideo() {
        videoElement.pause();
    }

    function stopVideo() {
        videoElement.pause();
        videoElement.currentTime = 0;
    }

    function applyTextOverlay() {
        if (ctx && overlayText) {
            ctx.font = '48px serif';
            ctx.fillText(overlayText, 10, 50);
        }
    }

    function applyFilter() {
        if (ctx) {
            ctx.filter = filter;
        }
    }

    function trimVideo() {
        videoElement.currentTime = startTime;
        videoElement.ontimeupdate = () => {
            if (videoElement.currentTime >= endTime) {
                videoElement.pause();
            }
        };
        videoElement.play();
    }

    onMount(() => {
        canvasElement = document.createElement('canvas');
        ctx = canvasElement.getContext('2d');
    });
</script>

<input type="file" accept="video/*" on:change={handleFileInput} />
{#if videoUrl}
    <video bind:this={videoElement} src={videoUrl} controls></video>
    <div>
        <button on:click={playVideo}>Play</button>
        <button on:click={pauseVideo}>Pause</button>
        <button on:click={stopVideo}>Stop</button>
    </div>
    <div>
        <label>Start Time: <input type="number" bind:value={startTime} min="0" max={endTime} /></label>
        <label>End Time: <input type="number" bind:value={endTime} min={startTime} max={videoElement.duration} /></label>
        <button on:click={trimVideo}>Trim Video</button>
    </div>
    <TextOverlay bind:overlayText={overlayText} on:apply={applyTextOverlay} />
    <VideoFilters bind:filter={filter} on:apply={applyFilter} />
    <ExportVideo {canvasElement} {videoElement} />
{/if}

<style>
    video {
        display: block;
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
    }
    div {
        margin-top: 10px;
    }
    label {
        display: block;
        margin: 5px 0;
    }
    button {
        margin: 5px 0;
    }
</style>
