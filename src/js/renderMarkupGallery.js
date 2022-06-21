import moment from 'moment';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';

export async function markupMoviesGallery(arr) {
  try {
    const markup = arr
      .map(item => {
        return `<li class="card">
        <a href="#" data-id="${item.id}">
          <img
            class="card__img" loading="lazy"
            src="https://image.tmdb.org/t/p/original/${item.poster_path}"
            alt="${item.title}"
          />
          <h2 class="card__title">${item.title}</h2>
          <p class="card__description" data-id="${item.id}">
            <span class="card__genre tooltip">${
              item.previewGenres
            } <span class="tooltiptext">${item.allGenres}</span> | ${moment(
          item.release_date
        ).format('YYYY')}</span>
            <span class="card__rating">${item.vote_average}</span>
          </p>
        </a>
      </li>`;
      })
      .join('');

    refs.galleryWatchedList.innerHTML = '';
    refs.galleryList.innerHTML = markup;
  } catch (error) {
    Notify.failure(error.message);
  }
}
