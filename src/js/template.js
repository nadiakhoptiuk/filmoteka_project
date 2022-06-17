import moment from 'moment';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MoviesService } from './fetch';
import { getTotalPage } from './pagination';
import { pagination } from './pagination';
import refs from "./refs";

export async function markupMoviesGallery() {
  try {
    const listOfMovies = await MoviesService.getMovies();
    const getListOfMovies = await listOfMovies.results;

    const markup = getListOfMovies.map((item) => {

    return `<li class="card">
        <a href="#">
          <img
            class="card__img" loading="lazy"
            src="https://image.tmdb.org/t/p/original/${item.poster_path}"
            alt="${item.title}"
          />
          <h2 class="card__title">${item.title}</h2>
          <p class="card__description">
            <span class="card__genre tooltip">${item.previewGenres} <span class="tooltiptext">${item.allGenres}</span> | ${moment(item.release_date).format('YYYY')}</span>
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