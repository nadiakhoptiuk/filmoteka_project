import { backdrop, homePage } from '../refs/refs';
// При кліку відкриває модальне вікно
function onModalOpen() {
  backdrop.classList.toggle('is-hidden');
  homePage.classList.toggle('modal-developers-is-open');
  document.addEventListener('keydown', onClickBackdrop);
}
// При кліку на бекдроп закриває модальне вікно
function onClickBackdrop(e) {
  if (e.target.classList.contains('backdrop') || e.key === 'Escape') {
    onModalOpen();
    document.removeEventListener('keydown', onClickBackdrop);
  }
}

export { onModalOpen, onClickBackdrop };
