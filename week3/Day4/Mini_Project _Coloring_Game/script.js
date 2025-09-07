const canvas = document.getElementById('canvas');
const colors = document.querySelectorAll('.color');
const clearBtn = document.getElementById('clear-btn');

let currentColor = 'black';
let isDrawing = false;

// Generate canvas squares
for (let i = 0; i < 1000; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  canvas.appendChild(square);

  // Mouse events
  square.addEventListener('mousedown', () => {
    square.style.backgroundColor = currentColor;
    isDrawing = true;
  });

  square.addEventListener('mouseover', () => {
    if (isDrawing) square.style.backgroundColor = currentColor;
  });

  square.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  // Touch events
  square.addEventListener('touchstart', (e) => {
    e.preventDefault();
    square.style.backgroundColor = currentColor;
  });

  square.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains('square')) {
      target.style.backgroundColor = currentColor;
    }
  });
}

// Stop drawing if mouse leaves the canvas
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Select color
colors.forEach(color => {
  color.addEventListener('click', () => {
    currentColor = color.style.backgroundColor;
  });
});

// Clear canvas
clearBtn.addEventListener('click', () => {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => (square.style.backgroundColor = 'white'));
});
