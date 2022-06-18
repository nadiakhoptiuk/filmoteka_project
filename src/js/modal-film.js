import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css"
import { copy } from './fetch';
import refs from './refs';
import {createModalFilm} from './created-modal-film'
const modal = basicLightbox.create(document.querySelector('#html'))

export function openModalFilm(ev) {
    ev.preventDefault();
    const evn = ev.target.parentNode;
    if (evn.nodeName !== 'A' && evn.nodeName!== "P") {
        return
    }
    const id = evn.dataset.id;
    acceptIdInformation(Number(id));
}

async function acceptIdInformation(id) {
    const arr = JSON.parse(copy);
    const filterId = arr.results.filter(ev => ev.id === id);
    modal.show()
    refs.body.style.overflow = "hidden"
     createModalFilm(filterId);
    window.addEventListener("keydown", closeModalFilmKey);
}
 function closeModalFilmKey(event) {
     if (event.code === "Escape") {
         closeModalFilm();     
  }
}
export function closeModalFilm() {
    modal.close()
    refs.body.style.overflow = "visible"
    window.removeEventListener("keydown",closeModalFilmKey)
}

