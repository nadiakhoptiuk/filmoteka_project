import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { copy } from './fetch';
import refs from './refs';
import { createModalFilm } from './created-modal-film';
import { getMovieData, chosenMovie } from './user-data';

const modal = basicLightbox.create(document.querySelector('#html'), {
  onClose: () => {
    refs.body.style.overflow = 'visible';
  },
  onShow: () => {
    refs.body.style.overflow = 'hidden';
  },
});

export function openModalFilm(ev) {
  ev.preventDefault();
  const evn = ev.target.parentNode;
  if (evn.nodeName !== 'A' && evn.nodeName !== 'P') {
    return;
  }
  const id = evn.dataset.id;
  acceptIdInformation(Number(id));
}

async function acceptIdInformation(id) {
  const arr = JSON.parse(copy);
  const filteredFilmById = await arr.results.filter(ev => ev.id === id);
  //
  const movieData = filteredFilmById[0];
  console.log(movieData);
  
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
