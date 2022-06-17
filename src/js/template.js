import moment from 'moment';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MoviesService } from './fetch';
import getRefs from "./refs";

const refs = getRefs();

export async function markupMoviesGallery() {
  try {
    const listOfMovies = await MoviesService.getMovies();
    const getListOfMovies = await listOfMovies.results;

    const markup = getListOfMovies.map((item) => {

    return `<li class="card">
        <a href="#">
          <img
            class="card__img" 
            src="https://image.tmdb.org/t/p/original/${item.poster_path}"
            alt=""
          />
          <h2 class="card__title">${item.title}</h2>
          <p class="card__description">
            <span class="card__genre">${item.previewGenres} | ${moment(item.release_date).format('YYYY')}</span>
            <span class="card__rating">${item.vote_average}</span>
          </p>
        </a>
      </li>`
   }).join('');
    
  refs.galleryList.innerHTML = markup;
  } catch (error) {
    Notify.failure(error.message);
  }
}