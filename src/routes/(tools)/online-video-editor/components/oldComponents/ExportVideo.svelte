<script>
    export let canvasElement;
    export let videoElement;

    function exportVideo() {
        if (canvasElement && videoElement) {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            const ctx = canvasElement.getContext('2d');
            
            videoElement.currentTime = 0;
            videoElement.play();
            
            videoElement.ontimeupdate = () => {
                ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                const frame = canvasElement.toDataURL('image/png');
                console.log(frame); // You can now use the frame for export
                // Add frame to the final video output (needs more complex handling)
            };
        }
    }
</script>

<button on:click={exportVideo}>Export Video</button>

<style>
    button {
        margin-top: 10px;
    }
</style>
