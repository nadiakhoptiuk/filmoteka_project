import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieTrailer } from './fetch';
import { ID } from './modal-film';
import refs from './refs';
let links = null;

const modal = basicLightbox.create(document.querySelector('#htmls'));
refs.btnTrailerLeft.addEventListener("click", ()=> addLink());
refs.btnTrailerRight.addEventListener("click", () => addLink(2));
export function openModalTrailer() {
    getMovieTrailer(ID)
      .then(createModalTrailer)
  .catch((error) => {
  console.error(error)
});
}
function addLink(ev) {
  let nows = Number(refs.iframeAtr.getAttribute('data-value'));
  console.log(nows);
  const length = links.length - 1;
  if (ev === 2) {
    nows += 1; 
  } else { nows -= 1 }
  if (nows === -1) {
    nows = length
  } else if (length < nows) {
    nows = 0;
  }
  refs.iframeAtr.setAttribute('data-value', nows)
  console.log(nows);
  console.log(length);
  createHtml(links,nows);
 }
function createModalTrailer(ev) {
  links = ev.data.results;
  createHtml(links);
  modal.show()

}
 function createHtml(ev, now = 0) {
  refs.iframeAtr.setAttribute("src", `https://www.youtube.com/embed/${ev[now].key}?controls=1&autoplay=1`)
}
