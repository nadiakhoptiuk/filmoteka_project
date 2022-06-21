import refs from './refs';
import { userAuthId } from './render-gallery-my-library';

export function openModalAuth() {
  refs.overlayEl.classList.remove('is-hidden');
  refs.body.classList.add('modal-auth-is-open');
}

export function closeModalAuth() {
  refs.overlayEl.classList.add('is-hidden');
  refs.body.classList.remove('modal-auth-is-open');
}

export function onCloseBtnModalAuth() {
  closeModalAuth();
  if (userAuthId === null) {
    window.location.href = 'index.html';
  }
}
