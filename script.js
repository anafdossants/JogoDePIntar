const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const eraserBtn = document.getElementById('eraserBtn');

let drawing = false;
let erasing = false;

// Função de desenho (mouse + touch)
function draw(x, y) {
  if (!drawing) return;

  ctx.lineCap = 'round';
  ctx.lineWidth = erasing ? 20 : brushSize.value; // borracha é mais grossa

  if (erasing) {
    ctx.strokeStyle = "white"; // borracha pinta de branco
  } else {
    ctx.strokeStyle = colorPicker.value;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// ==== EVENTOS DE MOUSE ====
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  draw(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  draw(e.clientX - rect.left, e.clientY - rect.top);
});

// ==== EVENTOS DE TOQUE ====
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  draw(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener('touchend', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  draw(touch.clientX - rect.left, touch.clientY - rect.top);
});

// Botão limpar
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Ativar/desativar borracha
function toggleEraser() {
  erasing = !erasing;
  eraserBtn.classList.toggle("active", erasing);
}

window.clearCanvas = clearCanvas;
window.toggleEraser = toggleEraser;
