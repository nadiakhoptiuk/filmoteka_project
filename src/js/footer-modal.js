import { refs } from './refs';
import { onClick, onClickBackdrop } from './modal-close';

refs.btn.addEventListener('click', onClick);
refs.closeBtn.addEventListener('click', onClick);
refs.backdrop.addEventListener('click', onClickBackdrop);
document.addEventListener('keydown', onClickBackdrop);
