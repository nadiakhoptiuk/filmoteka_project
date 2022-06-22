import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieById, getMovieTrailer } from '../service/service-fetch';
import { removeQ, removeW, addQ, addW } from '../constants';
import { openModalTrailer } from './modal-trailer';
import { createModalFilm } from '../templates/created-modal-film';
import {
  getMovieData,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
} from '../service/user-data';
import { userAuthId } from '../templates/render-gallery-my-library';
import {
  homePage,
  addToWatchedBtn,
  addToQueueBtn,
  btnCloseFilm,
  btnFilmTrailer,
} from '../refs/refs';
import { getDataFromFirebase, watch, queue } from '../utils/get-data-from-fb';

export let openedFilmId = null;

const modal = basicLightbox.create(document.querySelector('#html'), {
  // action on open modal film
  onClose: () => {
    homePage.classList.remove('modal-film-is-open');
    addToWatchedBtn.removeEventListener('click', onAddToWatchedBtnClick);
    addToQueueBtn.removeEventListener('click', onAddToQueueBtnClick);
    btnCloseFilm.removeEventListener('click', closeModalFilm);
    btnFilmTrailer.removeEventListener('click', openModalTrailer);
    window.removeEventListener('keydown', closeModalFilmKey);
  },
  // action on close modal film
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
// register click from gallery and take id
export function openModalFilm(ev) {
  ev.preventDefault();
  getDataFromFirebase(userAuthId);
  const evn = ev.target;
  if (evn.nodeName !== 'A' && evn.nodeName !== 'P') {
    return;
  }
  const id = evn.dataset.id;
  openedFilmId = Number(id);
  acceptIdInformation(openedFilmId);
}

async function acceptIdInformation(id) {
  const filteredFilmById = await getMovieById(id);
  const trailer = await getMovieTrailer(id);
  if (trailer.data.results.length === 0) {
    btnFilmTrailer.classList.add('none');
  } else {
    btnFilmTrailer.classList.remove('none');
  }
  filterFilmByBtn(id);
  const movieData = filteredFilmById;
  getMovieData(movieData);
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
//accept name film
export function filterFilmByBtn(id) {
  if (userAuthId) {
    let filteredFilmBtnByWatch = null;
    let filteredFilmBtnByQueue = null;
    if (watch) {
      filteredFilmBtnByWatch = watch.some(ev => ev.movie.id === id);
    }
    if (queue) {
      filteredFilmBtnByQueue = queue.some(ev => ev.movie.id === id);
    }
    renameBtnFilm(filteredFilmBtnByWatch, filteredFilmBtnByQueue);
  }
}
//rename btn film
function renameBtnFilm(watch, queue) {
  queue
    ? (addToQueueBtn.textContent = removeQ)
    : (addToQueueBtn.textContent = addQ);
  watch
    ? (addToWatchedBtn.textContent = removeW)
    : (addToWatchedBtn.textContent = addW);
}
