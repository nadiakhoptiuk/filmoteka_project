import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieTrailer } from '../service/service-fetch';
import { openedFilmId, closeModalFilmKey } from './modal-film';
import {
  iframeAtr,
  trailerInformationLength,
  btnTrailerPrev,
  btnTrailerNext,
  trailerInformationPage,
} from '../refs/refs';

let links = null;

const modal = basicLightbox.create(document.querySelector('#htmls'), {
  onClose: () => {
    window.addEventListener('keydown', closeModalFilmKey);
    btnTrailerPrev.removeEventListener('click', undoLink);
    btnTrailerNext.removeEventListener('click', nextLink);
    iframeAtr.setAttribute('data-value', 0);
  },
  onShow: () => {
    window.addEventListener('keydown', closeModalTrailerKey);
    btnTrailerPrev.addEventListener('click', undoLink);
    btnTrailerNext.addEventListener('click', nextLink);
  },
});
function closeModalTrailerKey(event) {
  if (event.code === 'Escape') {
    modal.close();
  }
}
export function openModalTrailer() {
  getMovieTrailer(openedFilmId)
    .then(createModalTrailer)
    .catch(error => {
      console.error(error);
    });
}
function nextLink() {
  let nows = Number(iframeAtr.getAttribute('data-value'));
  nows += 1;
  check(nows);
}
function undoLink() {
  let nows = Number(iframeAtr.getAttribute('data-value'));
  nows -= 1;
  check(nows);
}
function check(ev) {
  const length = links.length - 1;
  if (ev === -1) {
    ev = length;
  } else if (length < ev) {
    ev = 0;
  }
  iframeAtr.setAttribute('data-value', ev);
  console.log(ev);
  console.log(length);
  createIframeMarkup(links, ev);
}

function createModalTrailer(ev) {
  links = ev.data.results;
  createIframeMarkup(links);
  modal.show();
}

function createIframeMarkup(ev, now = 0) {
  iframeAtr.setAttribute(
    'src',
    `https://www.youtube.com/embed/${ev[now].key}?controls=1&autoplay=1`
  );
  trailerInformationLength.textContent = ev.length;
  trailerInformationPage.textContent = now + 1 + ' / ';
}
