import refs from './refs';
import { openModalAuth } from './modal-auth';
import { getWatchedFilms } from './render-gallery-my-library';

const btnWatched = document.querySelector('.watched');
const btnQueued = document.querySelector('.queued');

// btns-container

refs.btn.addEventListener('click', togglePages);
btnQueued.addEventListener('click', activeBtn);
btnWatched.addEventListener('click', activeBtn);

export function togglePages(e) {
  openModalAuth();
  refs.galleryRef.innerHTML = '<div class=warn>ThereIsNoSpoon</div>';
  refs.btnContainer.classList.remove('visually-hidden');
  refs.searchContainer.classList.add('visually-hidden');

  refs.navbarLink.classList.remove('current');
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
