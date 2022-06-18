// import { MoviesService } from './fetch';
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css"
import { MoviesService } from './fetch';
// import refs from "./refs";
 const modal = basicLightbox.create(document.querySelector('#html'))
export function test() {
    
    refs.galleryList.addEventListener("click", openModalFilm)
   
}
function openModalFilm(ev) {
    ev.preventDefault();
    const event = ev.target.parentNode;
    const id = event.dataset.id;
    acceptIdInformation(Number(id));
    modal.show()
}
async function acceptIdInformation(id) {
    const listOfMovies = await MoviesService.getMovies();
    const getListOfMovies = await listOfMovies.results;
    const filterId = getListOfMovies.filter(ev => ev.id === id);
    createModalFilm(filterId)
    
}
function createModalFilm(ev) {
    const { original_title, title, vote_average, vote_count, poster_path, overview, popularity
    } = ev[0];
    const filmTitle = document.querySelector(".modal-film__name");
    filmTitle.textContent = title;
}