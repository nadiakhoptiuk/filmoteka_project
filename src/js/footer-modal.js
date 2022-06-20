import refs from './refs';
import { onModalOpen, onClickBackdrop } from './modal-close';

refs.modalDevBtn.addEventListener('click', onModalOpen);
refs.closeModalDevBtn.addEventListener('click', onModalOpen);
refs.backdrop.addEventListener('click', onClickBackdrop);
