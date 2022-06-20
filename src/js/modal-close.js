import refs from './refs';

function onModalOpen() {
  refs.backdrop.classList.toggle('is-hidden');
  document.addEventListener('keydown', onClickBackdrop);
}

function onClickBackdrop(e) {
  if (e.target.classList.contains('backdrop') || e.key === 'Escape') {
    onModalOpen();
    document.removeEventListener('keydown', onClickBackdrop);
  }
}

export { onModalOpen, onClickBackdrop };
