const cover = document.getElementById('cover');
const book = document.getElementById('book');
const sheets = Array.from(document.querySelectorAll('.sheet'));

const totalSheets = sheets.length;
let currentFlipped = 0;

function updateZIndex() {
  sheets.forEach((sheet, i) => {
    const isFlipped = i < currentFlipped;
    sheet.style.zIndex = isFlipped ? i : totalSheets - i;
  });
}

function render() {
  sheets.forEach((sheet, i) => {
    sheet.classList.toggle('flipped', i < currentFlipped);
  });
  updateZIndex();
}

function nextPage() {
  if (currentFlipped < totalSheets) {
    currentFlipped++;
    render();
  }
}

function prevPage() {
  if (currentFlipped > 0) {
    currentFlipped--;
    render();
  }
}

// ---- Swipe / drag (dipasang di seluruh stage) ----
let startX = 0;
let isDragging = false;

const stage = document.querySelector('.stage');

stage.addEventListener('pointerdown', (e) => {
  startX = e.clientX;
  isDragging = true;
});

stage.addEventListener('pointerup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const deltaX = e.clientX - startX;
  const threshold = 50;

  const coverOpen = cover.classList.contains('opened');

  if (deltaX < -threshold) {
    if (!coverOpen) {
      cover.classList.add('opened'); // swipe kiri pertama kali = buka cover
    } else {
      nextPage();
    }
  } else if (deltaX > threshold) {
    if (coverOpen && currentFlipped === 0) {
      cover.classList.remove('opened'); // swipe kanan waktu di halaman pertama = tutup lagi
    } else {
      prevPage();
    }
  }
});

render();