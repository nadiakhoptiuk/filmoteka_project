import refs from './refs';

function onClick() {
  refs.body.classList.toggle('hidden');
  refs.backdrop.classList.toggle('isHide');
  document.addEventListener('keydown', onClickBackdrop);
}

function onClickBackdrop(e) {
  if (e.target.classList.contains('backdrop') || e.key === 'Escape') {
    onClick();
    document.removeEventListener('keydown', onClickBackdrop);
  }
}

export { onClick, onClickBackdrop };
