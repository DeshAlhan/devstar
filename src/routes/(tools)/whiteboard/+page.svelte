<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Whiteboard</title>
  <style>
    .inner-card {
      height: 600px;
      position: relative;
    }

    #whiteboard {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
    }

    .nav-bar {
      width: 100%;
      position: relative;
    }

    .tool-btn {
      border: none;
      padding: 8px 16px;
      margin: 4px;
      cursor: pointer;
      border-radius: 4px;
      position: relative;
    }

    .tool-btn:hover {
      background-color: #e0e0e0;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 8px); 
      left: 0;
      z-index: 1000;
      display: none;
      background-color: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      width: max-content; 
    }

    .dropdown.active {
      display: block;
    }

    .dropdown-arrow {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      border-color: #f0f0f0 transparent transparent transparent;
    }

    .dropdown-item {
      padding: 8px 16px;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
  <div class="card items-center mx-auto max-w-screen-xl lg:grid overflow-hidden rounded-lg">
    <!-- Navigation bar -->
    <div class="nav-bar bg-gray-200 p-2 flex items-center">
      <button id="pencil" class="tool-btn"><img src="/src/images/pencil.png" alt=""/></button>
      <div class="relative">
        <button id="eraser" class="tool-btn"><img src="/src/images/eraser.png" alt=""/><span class="dropdown-arrow"></span></button>
        <div id="eraser-width-dropdown" class="dropdown">
          <div class="dropdown-item" data-width="5">5px</div>
          <div class="dropdown-item" data-width="10">10px</div>
          <div class="dropdown-item" data-width="15">15px</div>
          <div class="dropdown-item" data-width="20">20px</div>
        </div>
      </div>
      <button id="fill" class="tool-btn"><img src="/src/images/paint-bucket.png" alt=""/></button>
      <button id="shapes" class="tool-btn"><img src="/src/images/shapes.png" alt=""/></button>
      <button id="undo" class="tool-btn"><img src="/src/images/undo.png" alt=""/></button>
      <button id="redo" class="tool-btn"><img src="/src/images/redo.png" alt=""/></button>
    </div>
    
    <!-- Whiteboard area -->
    <div class="inner-card w-full bg-white">
      <canvas id="whiteboard"></canvas>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const canvas = document.getElementById('whiteboard');
      const ctx = canvas.getContext('2d');
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      let eraserSize = 10;
      let drawingHistory = [];
      let historyIndex = -1;

      function initializeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }

      function draw(e) {
        if (!isDrawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        if (pencilActive) {
          ctx.strokeStyle = '#000'; 
        } else if (eraserActive) {
          ctx.strokeStyle = '#fff'; 
          ctx.lineWidth = eraserSize; 
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];

        if (!eraserActive) {
          saveDrawingAction();
        }
      }

      function stopDrawing() {
        isDrawing = false;
        if (!eraserActive && historyIndex < drawingHistory.length - 1) {
          drawingHistory = drawingHistory.slice(0, historyIndex + 1);
        }
      }

      function saveDrawingAction() {
        historyIndex++;
        if (historyIndex < drawingHistory.length) {
          drawingHistory.splice(historyIndex);
        }
        drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }

      function undoDrawing() {
        if (historyIndex > 0) {
          historyIndex--;
          ctx.putImageData(drawingHistory[historyIndex], 0, 0);
        }
      }

      function redoDrawing() {
        if (historyIndex < drawingHistory.length - 1) {
          historyIndex++;
          ctx.putImageData(drawingHistory[historyIndex], 0, 0);
        }
      }

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);

      let pencilActive = true;
      let eraserActive = false;

      const pencilBtn = document.getElementById('pencil');
      pencilBtn.addEventListener('click', function() {
        pencilActive = true;
        eraserActive = false;
        canvas.style.cursor = 'crosshair';
        hideDropdown();
      });

      const eraserBtn = document.getElementById('eraser');
      const eraserDropdown = document.getElementById('eraser-width-dropdown');
      const dropdownArrow = document.querySelector('.dropdown-arrow');
      eraserBtn.addEventListener('click', function() {
        eraserActive = !eraserActive; 
        pencilActive = !eraserActive; 
        canvas.style.cursor = eraserActive ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'%23ffffff\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5 13V6h10v7H5zm11 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5h12zM7 8v2h6V8H7z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E") 14 14, auto' : 'crosshair';
        eraserDropdown.classList.toggle('active');
        dropdownArrow.classList.toggle('active'); 
      });

      function hideDropdown() {
        eraserDropdown.classList.remove('active');
        dropdownArrow.classList.remove('active'); 
      }

      const dropdownItems = document.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
          eraserSize = parseInt(this.getAttribute('data-width'));
          hideDropdown();
        });
      });

      const fillBtn = document.getElementById('fill');
      fillBtn.addEventListener('click', function() {
        hideDropdown();
      });

      const shapesBtn = document.getElementById('shapes');
      shapesBtn.addEventListener('click', function() {
        hideDropdown();
      });

      const undoBtn = document.getElementById('undo');
      undoBtn.addEventListener('click', function() {
        undoDrawing();
        hideDropdown();
      });

      const redoBtn = document.getElementById('redo');
      redoBtn.addEventListener('click', function() {
        redoDrawing();
        hideDropdown();
      });

      window.addEventListener('resize', initializeCanvas);
      initializeCanvas();

      // Ensure canvas is initialized properly when navigating to the whiteboard
      function ensureCanvasInitialization() {
        setTimeout(initializeCanvas, 100);
      }

      ensureCanvasInitialization();

      window.addEventListener('load', ensureCanvasInitialization);
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
          ensureCanvasInitialization();
        }
      });
    });
  </script>
</body>
</html>