import refs from './refs';
import { openModalAuth } from './modal-auth';
import { getWatchedFilms } from './render-gallery-my-library';

const btnWatched = document.querySelector('.watched');
const btnQueued = document.querySelector('.queued');

// btns-container

refs.navbarBtn.addEventListener('click', togglePages);
btnQueued.addEventListener('click', activeBtn);
btnWatched.addEventListener('click', activeBtn);

export function togglePages(e) {
  openModalAuth();
  refs.galleryWatchedList.innerHTML =
    '<p class="no-films-in-list">You haven`t added anything yet...</p>';
  refs.btnContainer.classList.remove('visually-hidden');
  refs.searchContainer.classList.add('visually-hidden');

  refs.btnHome.classList.remove('current');
  refs.navbarBtn.classList.add('current');
  refs.headerEl.classList.remove('header-container');
  refs.headerEl.classList.add('header-container-my-library');
  getWatchedFilms();
  colorSwitch();
}

export function activeBtn() {
  if ((btnWatched.contains = 'active')) {
    btnQueued.classList.toggle('active');
  }
  if ((btnQueued.contains = 'active')) {
    btnWatched.classList.toggle('active');
  }
}

export function colorSwitch() {
  if ((refs.btnHome.contains = 'nav-link--current')) {
    refs.navbarBtn.classList.toggle('nav-link--current');
  }
  if ((refs.navbarBtn.contains = 'nav-link--current')) {
    refs.btnHome.classList.toggle('nav-link--current');
  }
}
