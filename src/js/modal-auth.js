const modalAuthEl = document.querySelector('.modal-auth__btn-close');
const overlayEl = document.querySelector('.overlay-auth');

modalAuthEl.addEventListener('click', closeModal);

function closeModal() {
  overlayEl.classList.add('is-hidden');
}
