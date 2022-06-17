import refs from './refs';

// refs.modalAuthEl.addEventListener('click', closeModalAuth);

export function closeModalAuth() {
  refs.overlayEl.classList.add('is-hidden');
}
