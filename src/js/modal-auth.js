// const modalAuthEl = document.querySelector('.modal-auth__btn-close');
// const overlayEl = document.querySelector('.overlay-auth');
import refs from './refs';

refs.modalAuthEl.addEventListener('click', closeModal);

function closeModal() {
  refs.overlayEl.classList.add('is-hidden');
}
