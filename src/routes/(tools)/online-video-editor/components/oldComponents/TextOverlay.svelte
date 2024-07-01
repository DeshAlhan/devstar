<script>
    export let overlayText;
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function applyOverlay() {
        dispatch('apply');
    }
</script>

<div>
    <label>
        Overlay Text:
        <input type="text" bind:value={overlayText} />
    </label>
    <button on:click={applyOverlay}>Apply Text Overlay</button>
</div>

<style>
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





<!-- Saurabh -->