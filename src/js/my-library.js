import { openModalAuth } from './modals/modal-auth';
import {
  userAuthId,
  getWatchedFilms,
  getQueueFilms,
} from './templates/render-gallery-my-library';
import {
  formTextErrSearch,
  myLibraryBtn,
  btnHome,
  btnWatched,
  btnQueue,
  galleryHome,
  galleryWatchedList,
  btnContainer,
  searchContainer,
  headerEl,
} from './refs/refs';
import {
  changeMyLibraryBtnStyles,
  changeHeaderBtnStyles,
} from './service/heafer-button-swith';

// Функция обработчик клика My Library
export function onMyLibraryButton() {
  formTextErrSearch.classList.add('visually-hidden');
  if (!userAuthId) {
    openModalAuth();
  } else {
    getWatchedFilms(userAuthId);
  }
  if (userAuthId !== null) {
    getWatchedFilms(userAuthId);
  }
  changeHeaderBtnStyles(myLibraryBtn, btnHome);
  togglePages();
  getWatchedFilms(userAuthId);
}

// Функция обработчик клика Watched
export function onBtnWatched() {
  changeMyLibraryBtnStyles(btnWatched, btnQueue);
  if (userAuthId !== null) {
    getWatchedFilms(userAuthId);
  }
}

// Функция обработчик клика Queue
export function onBtnQueue() {
  changeMyLibraryBtnStyles(btnQueue, btnWatched);
  if (userAuthId !== null) {
    getQueueFilms(userAuthId);
  }
}

// Функция обработчик клика Home
export function onBtnHome() {
  changeHeaderBtnStyles(btnHome, myLibraryBtn);
}

export function togglePages() {
  galleryHome.innerHTML = '';
  galleryWatchedList.innerHTML =
    '<p class="no-films-in-list">You haven`t added anything yet... &#128546</p>';
  btnContainer.classList.remove('visually-hidden');
  searchContainer.classList.add('visually-hidden');

  btnHome.classList.remove('current');
  myLibraryBtn.classList.add('current');
  headerEl.classList.remove('header-container');
  headerEl.classList.add('header-container-my-library');
}
