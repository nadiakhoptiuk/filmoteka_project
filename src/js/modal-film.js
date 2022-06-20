import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { copy } from './fetch';
import refs from './refs';
import { createModalFilm } from './created-modal-film';
import { getMovieData } from './user-data';
import { watchedFilmsData,queuedFilmsData } from './render-gallery-my-library';
export let openedFilmId = null;
const modal = basicLightbox.create(document.querySelector('#html'), {
  onClose: () => {
    refs.body.classList.remove('modal-film-is-open');
     },
  onShow: () => {
    refs.body.classList.add('modal-film-is-open');
  },
});
export function openModalFilm(ev) {
  ev.preventDefault();
  const evn = ev.target.parentNode;
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
  window.addEventListener('keydown', closeModalFilmKey);
}
function closeModalFilmKey(event) {
  if (event.code === 'Escape') {
    closeModalFilm();
  }
}
export function closeModalFilm() {
  modal.close();
  window.removeEventListener('keydown', closeModalFilmKey);
}
export function filterFilmByBtn(id) {
  const filteredFilmBtnByWatch = watchedFilmsData.some(ev => ev.movie.id === id);
  const filteredFilmBtnByQueue = queuedFilmsData.some(ev => ev.movie.id === id);
  renameBtnFilm(filteredFilmBtnByWatch, filteredFilmBtnByQueue)
}
function renameBtnFilm(watch, queue) {
  queue ? refs.addToQueueBtn.textContent = 'remove from queue' : refs.addToQueueBtn.textContent = 'add to queue';
  if (watch) {
   refs.addToQueueBtn.textContent === "remove from queue" ? refs.addToWatchedBtn.textContent = 'move to watched' : refs.addToWatchedBtn.textContent = 'remove from watched'
  } else { refs.addToWatchedBtn.textContent = 'add to watched' };
}