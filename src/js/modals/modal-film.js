import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { copy } from '../service/service-fetch';
import { openModalTrailer } from './modal-trailer';
import { createModalFilm } from '../templates/created-modal-film';
import {
  getMovieData,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
} from '../service/user-data';
import {
 
   userAuthId,
} from '../templates/render-gallery-my-library';
import {
  homePage,
  addToWatchedBtn,
  addToQueueBtn,
  btnCloseFilm,
  btnFilmTrailer,
} from '../refs/refs';
import { getDataFromFirebase, watch,queue} from '../utils/firebase';
export let openedFilmId = null;
const modal = basicLightbox.create(document.querySelector('#html'), {
  onClose: () => {
    homePage.classList.remove('modal-film-is-open');
    addToWatchedBtn.removeEventListener('click', onAddToWatchedBtnClick);
    addToQueueBtn.removeEventListener('click', onAddToQueueBtnClick);
    btnCloseFilm.removeEventListener('click', closeModalFilm);
    btnFilmTrailer.removeEventListener('click', openModalTrailer);
    window.removeEventListener('keydown', closeModalFilmKey);
  },
  onShow: () => {
    btnCloseFilm.addEventListener('click', closeModalFilm);
    addToWatchedBtn.addEventListener('click', onAddToWatchedBtnClick);
    addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);
    btnFilmTrailer.addEventListener('click', () => {
      openModalTrailer();
      window.removeEventListener('keydown', closeModalFilmKey);
    });
    window.addEventListener('keydown', closeModalFilmKey);
    homePage.classList.add('modal-film-is-open');
  },
});
export function openModalFilm(ev) {
  ev.preventDefault();
  getDataFromFirebase(userAuthId)
  const evn = ev.target;
  if (evn.nodeName !== 'A' && evn.nodeName !== 'P') {
    return;
  }
  const id = evn.dataset.id;
  openedFilmId = Number(id);
  acceptIdInformation(openedFilmId);
}

async function acceptIdInformation(id) {
  const arr = JSON.parse(copy);
  const filteredFilmById = await arr.results.filter(ev => ev.id === id);
  filterFilmByBtn(id);
  //
  const movieData = filteredFilmById[0];

  getMovieData(movieData);
  //
  modal.show();
  createModalFilm(filteredFilmById);
}
export function closeModalFilmKey(event) {
  if (event.code === 'Escape') {
    closeModalFilm();
  }
}
export function closeModalFilm() {
  modal.close();
}
export function filterFilmByBtn(id) {
  if (userAuthId) {
    let filteredFilmBtnByWatch = null;
    let filteredFilmBtnByQueue = null;
    if (watch) {
      filteredFilmBtnByWatch = watch.some(ev => ev.movie.id === id);
    }
    if (queue) {
      console.log(queue);
      filteredFilmBtnByQueue = queue.some(ev => ev.movie.id === id);
    }
    renameBtnFilm(filteredFilmBtnByWatch, filteredFilmBtnByQueue);
  }
}
function renameBtnFilm(watch, queue) {
  queue
    ? (addToQueueBtn.textContent = 'remove from queue')
    : (addToQueueBtn.textContent = 'add to queue');
  if (watch) {
    addToQueueBtn.textContent === 'remove from queue'
      ? (addToWatchedBtn.textContent = 'move to watched')
      : (addToWatchedBtn.textContent = 'remove from watched');
  } else {
    addToWatchedBtn.textContent = 'add to watched';
  }
}
