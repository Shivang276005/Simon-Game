const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('modalOverlay');

// Open modal
openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if user clicks outside the modal box
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
