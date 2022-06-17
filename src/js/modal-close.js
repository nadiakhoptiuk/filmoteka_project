import { refs } from './refs';
function onClickBackdrop(e) {
  if (e.target.classList.contains('backdrop') || e.key === 'Escape') {
    onClick();
  }
}

function onClick() {
  if (refs.backdrop.hasAttribute('hidden')) {
    refs.backdrop.removeAttribute('hidden');
  } else {
    refs.backdrop.setAttribute('hidden', true);
  }
  refs.body.classList.toggle('hidden');
}
export { onClick, onClickBackdrop };
