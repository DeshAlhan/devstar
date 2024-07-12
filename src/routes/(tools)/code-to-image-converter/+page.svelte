<script>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import hljs from 'highlight.js/lib/core';
    import html2canvas from 'html2canvas';
    import javascript from 'highlight.js/lib/languages/javascript';
    import html from 'highlight.js/lib/languages/xml';
    import css from 'highlight.js/lib/languages/css';
    import python from 'highlight.js/lib/languages/python';
    import java from 'highlight.js/lib/languages/java';
    import php from 'highlight.js/lib/languages/php';
    import typescript from 'highlight.js/lib/languages/typescript';
    import kotlin from 'highlight.js/lib/languages/kotlin';
    import swift from 'highlight.js/lib/languages/swift';
    import dart from 'highlight.js/lib/languages/dart';
    import ruby from 'highlight.js/lib/languages/ruby';
    import rust from 'highlight.js/lib/languages/rust';
    import csharp from 'highlight.js/lib/languages/csharp';
    import go from 'highlight.js/lib/languages/go';

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('html', html);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('kotlin', kotlin);
    hljs.registerLanguage('swift', swift);
    hljs.registerLanguage('dart', dart);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('csharp', csharp);
    hljs.registerLanguage('go', go);

    const codeStore = writable(`function helloWorld() {
        console.log("Hello, World!");
    }`);

    let currentStyle = 'javascript';
    let codePreview = '';
    let fontSize = '16px';
    let theme = 'github';
    let darkMode = false;

    const themes = [
        'github', 'monokai', 'atom-one-dark', 'dracula', 'solarized-light', 'solarized-dark'
    ];

    function updateCodePreview() {
        codeStore.subscribe(value => {
            const highlightedCode = hljs.highlight(currentStyle, value).value;
            codePreview = highlightedCode;
        });
    }

    function updateTheme() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/${theme}.min.css`;
        document.head.appendChild(link);
    }

    onMount(() => {
        updateCodePreview();
        updateTheme();
    });

    function handleCodeInput(event) {
        codeStore.set(event.target.value);
        updateCodePreview();
    }

    function handleStyleChange(event) {
        currentStyle = event.target.value;
        updateCodePreview();
    }

    function handleFontSizeChange(event) {
        fontSize = event.target.value + 'px';
    }

    function handleThemeChange(event) {
        theme = event.target.value;
        updateTheme();
        updateCodePreview();
    }

    function toggleDarkMode() {
        darkMode = !darkMode;
    }

    async function downloadImage() {
        const previewElement = document.getElementById('codePreviewContainer');
        const canvas = await html2canvas(previewElement, {
            backgroundColor: null, // Ensures the background color is not overridden
            scale: window.devicePixelRatio, // Ensures high-quality output
        });

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpg');
        link.download = 'code_image.jpg';
        link.click();
    }
</script>

<style>
    :global(.dark-mode) {
        background-color: #1a202c;
        color: #cbd5e0;
    }

    pre, code {
        line-height: 1.5; /* Ensure lines do not overlap */
        letter-spacing: 0.1em; /* Adjust letter-spacing for better readability */
        font-family: 'Courier New', Courier, monospace; /* Use a monospaced font for code */
        font-size: var(--font-size); /* Dynamic font size */
        white-space: pre; /* Ensure whitespace is preserved */
    }

    .code-container {
        overflow-x: auto; /* Enable horizontal scrolling */
        max-width: 100%; /* Ensure the container does not overflow */
    }
</style>

<div class="container mx-auto p-6" class:dark-mode={darkMode}>
    <h1 class="text-2xl font-bold mb-4 text-white">Code to Image Converter</h1>

    <textarea class="w-full p-2 mb-4 border border-gray-300 rounded-lg resize-none font-mono"
              bind:value={$codeStore} on:input={handleCodeInput} rows="10"></textarea>

    <div class="mb-4">
        <h2 class="font-medium mb-2 text-white">Select Syntax Highlighting Language</h2>
        <select class="border border-gray-300 rounded-lg p-2 bg-white"
                bind:value={currentStyle} on:change={handleStyleChange}>
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
            <option value="typescript">TypeScript</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="dart">Dart</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <!-- Add more options based on available highlight.js languages -->
        </select>
    </div>

    <div class="mb-4">
        <h2 class="font-medium mb-2 text-white">Select Font Size</h2>
        <input type="number" class="border border-gray-300 rounded-lg p-2 bg-white"
               min="10" max="30" value="16" on:input={handleFontSizeChange}>
    </div>

    <div class="mb-4">
        <h2 class="font-medium mb-2 text-white">Select Theme</h2>
        <select class="border border-gray-300 rounded-lg p-2 bg-white"
                bind:value={theme} on:change={handleThemeChange}>
            {#each themes as themeOption}
                <option value={themeOption}>{themeOption}</option>
            {/each}
        </select>
    </div>

    <div class="mb-4">
        <h2 class="font-medium mb-2 text-white">Toggle Dark Mode</h2>
        <button class="border border-gray-300 rounded-lg p-2 bg-white"
                on:click={toggleDarkMode}>
            {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        </button>
    </div>

    <div class="mb-4">
        <h2 class="font-medium mb-2 text-white">Preview</h2>
        <div class="code-container" id="codePreviewContainer">
            <pre id="codePreview" class="p-4 rounded-lg {darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}" style="--font-size: {fontSize};"><code>{@html codePreview}</code></pre>
        </div>
    </div>

    <button class="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            on:click={downloadImage}>
        Download Image
    </button>
</div>
