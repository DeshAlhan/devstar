<script>
  import { onMount } from 'svelte';
  import html2canvas from 'html2canvas';

  let code = '';
  let imageUrl = '';

  const generateImage = async () => {
    const codeBlock = document.getElementById('code-block');
    const canvas = await html2canvas(codeBlock);
    imageUrl = canvas.toDataURL();
  };
</script>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 150px;
    font-family: monospace;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    resize: none;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  button:hover {
    background-color: #45a049;
  }

  #code-block {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    white-space: pre-wrap;
    margin-top: 10px;
  }

  .image-container {
    margin-top: 20px;
    text-align: center;
  }

  .image-container img {
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>

<div class="container">
  <h1>Code to Image Converter</h1>
  <textarea bind:value={code} placeholder="Enter your code here..."></textarea>
  <button on:click={generateImage}>Convert to Image</button>

  <div id="code-block">
    {code}
  </div>

  {#if imageUrl}
    <div class="image-container">
      <h3>Generated Image:</h3>
      <img src={imageUrl} alt="Code Image" />
    </div>
  {/if}
</div>
