import refs from './refs';

export function openModalAuth() {
  refs.overlayEl.classList.remove('is-hidden');
  refs.body.classList.add('modal-auth-is-open');
}

export function closeModalAuth() {
  refs.overlayEl.classList.add('is-hidden');
  refs.body.classList.remove('modal-auth-is-open');
}
