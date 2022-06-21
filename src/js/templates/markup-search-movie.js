import moment from 'moment';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { galleryList } from '../refs/refs';

export async function markupMoviesGalleryBySearch(arr) {
  try {
    const markup = arr
      .map(item => {
        return `<li class="card">
        <a href="#" data-id="${item.id}">
          <picture>
        <source
          srcset="https://image.tmdb.org/t/p/w780/${item.poster_path}"
          media="(min-width: 1280px)"
        />
        <source
          media="(min-width: 768px)"
          srcset="https://image.tmdb.org/t/p/w500/${item.poster_path}"
        />
        <source
          media="(min-width: 320px)"
          srcset="https://image.tmdb.org/t/p/w342/${item.poster_path}"
        />
        <img
          srcset="https://image.tmdb.org/t/p/w342/${item.poster_path}"
          src="https://image.tmdb.org/t/p/w342/${item.poster_path}"
          alt="${item.title}"
          class="card__img" loading="lazy"
        />
      </picture>
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

    galleryList.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure('Something went wrong &#128543;');
  }
}
