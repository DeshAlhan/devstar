<!-- Whiteboard.svelte -->

<script>
  let isDrawing = false;
  let ctx;
  
  function startDrawing(event) {
    isDrawing = true;
    ctx = event.target.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
  }
  
  function draw(event) {
    if (!isDrawing) return;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
  }
  
  function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
  }
</script>

<style>
  canvas {
    border: 1px solid #000;
    cursor: crosshair;
  }
</style>

<canvas
  width="800"
  height="600"
  @mousedown={startDrawing}
  @mousemove={draw}
  @mouseup={stopDrawing}
  @mouseleave={stopDrawing}
></canvas>
