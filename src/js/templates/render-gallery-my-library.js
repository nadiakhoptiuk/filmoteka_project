import { ref, onValue } from 'firebase/database';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import moment from 'moment';
import { db } from '../service/db-manipulations';
import {
  galleryHome,
  galleryWatchedList,
  galleryQueue,
  galleryWatched,
  galleryQueueList,
} from '../refs/refs';
import { getDataFromFirebase } from '../utils/get-data-from-fb';

export let watchedFilms = null;
export let queuedFilms = null;
export let userAuthId = null;

//  Функция забирает Watched фильмы из стораджа
export function getWatchedFilms(userKey) {
  const getWatched = ref(db, `${userKey}` + '/watched');

  onValue(getWatched, snapshot => {
    const data = snapshot.val();
    if (data !== null) {
      watchedFilms = Object.values(data);
    }
    galleryWatchedList.innerHTML =
      '<p class="no-films-in-list">You haven`t added anything yet...&#128546</p>';
    galleryWatched.classList.remove('is-hidden');

    if (data !== null) {
      renderWatchedGallery(watchedFilms, 'watched');
    }
  });
}

//  Функция забирает Queue фильмы из стораджа
export function getQueueFilms(userKey) {
  const getQueue = ref(db, `${userKey}` + '/queue');

  onValue(getQueue, snapshot => {
    const data = snapshot.val();
    if (data !== null) {
      queuedFilms = Object.values(data);
    }
    galleryQueueList.innerHTML =
      '<p class="no-films-in-list">You haven`t added anything yet...&#128546</p>';
    if (data !== null) {
      renderWatchedGallery(queuedFilms, 'queue');
    }
  });
}

// Функция рендерит Wathed Gallery
async function renderWatchedGallery(data, nameGallery) {
  try {
    const markup = data
      .map(item => {
        const genresArr = item.movie.genres?.map(item => item.name);
        const genresShort =
          genresArr?.length > 2
            ? genresArr?.slice(0, 2)?.join(', ') + ', ...'
            : genresArr?.join(', ');
        return `<li class="card">
        <div class="img-thumb">
          <picture>
        <source
          srcset="https://image.tmdb.org/t/p/w780/${
            !item.movie.poster_path
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
          media="(min-width: 1280px)"
        />
        <source
          media="(min-width: 768px)"
          srcset="https://image.tmdb.org/t/p/w500/${
            !item.movie.poster_path
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
        />
        <source
          media="(min-width: 320px)"
          srcset="https://image.tmdb.org/t/p/w342/${
            !item.movie.poster_path
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
        />
        <img
          srcset="https://image.tmdb.org/t/p/w342/${
            !item.movie.poster_path
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
          src="https://image.tmdb.org/t/p/w342/${
            !item.movie.poster_path
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
          alt="${item.movie.title}"
          class="card__img" loading="lazy"
        />
      </picture>
      </div>
      <a href="#" data-id="${item.movie.id}" class="card-link">
          <h2 class="card__title">${item.movie.title}</h2>
          </a>
          <p class="card__description" data-id="${item.movie.id}">
            <span class="card__genre tooltip">${genresShort ?? `unknown genre`} 
            <span class="tooltiptext">${
              genresArr.join(', ') ?? `unknown genre`
            }</span> | ${
          !item.movie.release_date
            ? 'released'
            : moment(item.movie.release_date).format('YYYY')
        }</span>
            <span class="card__rating">${item.movie.vote_average}</span>
          </p>
      </li>`;
      })
      .join('');

    if (nameGallery === 'watched') {
      galleryHome.classList.add('is-hidden');
      galleryQueue.classList.add('is-hidden');
      galleryWatched.classList.remove('is-hidden');
      galleryQueueList.innerHTML = '';
      galleryWatchedList.innerHTML = '';
      galleryWatchedList.innerHTML = markup;
    }

    if (nameGallery === 'queue') {
      galleryHome.classList.add('is-hidden');
      galleryWatched.classList.add('is-hidden');
      galleryQueue.classList.remove('is-hidden');
      galleryWatchedList.innerHTML = '';
      galleryQueueList.innerHTML = '';
      galleryQueueList.innerHTML = markup;
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

// Функция для получения ID
export function getUserAuthId(id) {
  userAuthId = id;

  getDataFromFirebase(userAuthId)
  console.log(userAuthId);
}
