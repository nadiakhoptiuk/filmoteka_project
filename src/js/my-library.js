import refs from './refs';
import { openModalAuth } from './modal-auth';
import {
  changeMyLibraryBtnStyles,
  changeHeaderBtnStyles,
  userAuthId,
  getWatchedFilms,
  getQueueFilms,
} from './render-gallery-my-library';

// Функция обработчик клика My Library
export function onMyLibraryButton() {
  refs.formTextErrSearch.classList.add('visually-hidden');
  if (!userAuthId) {
    openModalAuth();
  } else {
    getWatchedFilms(userAuthId);
  }
  if (userAuthId !== null) {
    getWatchedFilms(userAuthId);
  }
  changeHeaderBtnStyles(refs.myLibraryBtn, refs.btnHome);
  togglePages();
}

// Функция обработчик клика Watched
export function onBtnWatched() {
  changeMyLibraryBtnStyles(refs.btnWatched, refs.btnQueue);
  if (userAuthId !== null) {
    getWatchedFilms(userAuthId);
  }
}

// Функция обработчик клика Queue
export function onBtnQueue() {
  changeMyLibraryBtnStyles(refs.btnQueue, refs.btnWatched);
  if (userAuthId !== null) {
    getQueueFilms(userAuthId);
  }
}

// Функция обработчик клика Home
export function onBtnHome() {
  changeHeaderBtnStyles(refs.btnHome, refs.myLibraryBtn);
}

export function togglePages() {
  refs.galleryHome.innerHTML = '';
  refs.galleryWatchedList.innerHTML =
    '<p class="no-films-in-list">You haven`t added anything yet... &#128546</p>';
  refs.btnContainer.classList.remove('visually-hidden');
  refs.searchContainer.classList.add('visually-hidden');

  refs.btnHome.classList.remove('current');
  refs.myLibraryBtn.classList.add('current');
  refs.headerEl.classList.remove('header-container');
  refs.headerEl.classList.add('header-container-my-library');
}
