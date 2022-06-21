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

export let watchedFilms = null;
export let queuedFilms = null;
export let userAuthId = 'null';

//  Функция забирает Watched фильмы из стораджа
export function getWatchedFilms(userKey) {
  console.log('RENDER WATCHED');
  const getWatched = ref(db, `${userKey}` + '/watched');

  onValue(getWatched, snapshot => {
    const data = snapshot.val();
    if (!data) {
      galleryWatchedList.innerHTML =
        '<p class="no-films-in-list">You haven`t added anything yet...</p>';
      return;
    }
    watchedFilms = Object.values(data);
    console.log(watchedFilms);
    renderWatchedGallery(watchedFilms, 'watched');
  });
}

//  Функция забирает Queue фильмы из стораджа
export function getQueueFilms(userKey) {
  console.log('RENDER QUEUE');
  const getQueue = ref(db, `${userKey}` + '/queue');
  onValue(getQueue, snapshot => {
    const data = snapshot.val();
    if (!data) {
      galleryWatchedList.innerHTML =
        '<p class="no-films-in-list">You haven`t added anything yet...</p>';
      return;
    }
    queuedFilms = Object.values(data);
    console.log(queuedFilms);
    renderWatchedGallery(queuedFilms, 'queue');
  });
}

// Функция рендерит Wathed Gallery
async function renderWatchedGallery(data, nameGallery) {
  try {
    const markup = data
      .map(item => {
        return `<li class="card">
          <picture>
        <source
          srcset="https://image.tmdb.org/t/p/w780/${
            item.movie.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
          media="(min-width: 1280px)"
        />
        <source
          media="(min-width: 768px)"
          srcset="https://image.tmdb.org/t/p/w500/${
            item.movie.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
        />
        <source
          media="(min-width: 320px)"
          srcset="https://image.tmdb.org/t/p/w342/${
            item.movie.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
        />
        <img
          srcset="https://image.tmdb.org/t/p/w342/${
            item.movie.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
          src="https://image.tmdb.org/t/p/w342/${
            item.movie.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.movie.poster_path
          }"
          alt="${item.movie.title}"
          class="card__img" loading="lazy"
        />
      </picture>
      <a href="#" data-id="${item.movie.id}" class="card-link">
          <h2 class="card__title">${item.movie.title}</h2>
          </a>
          <p class="card__description" data-id="${item.movie.id}">
            <span class="card__genre tooltip">${
              item.movie.previewGenres
            } <span class="tooltiptext">${
          item.movie.allGenres
        }</span> | ${moment(item.movie.release_date).format('YYYY')}</span>
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

// Функция для переключения стилей кнопок Watched и Queue
export function changeMyLibraryBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('active');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('active');
  disabledButton.removeAttribute('disabled', 'disabled');
}

// Функция для переключения стилей кнопок Home и My Library
export function changeHeaderBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('nav-link--current');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('nav-link--current');
  disabledButton.removeAttribute('disabled', 'disabled');
}

// Функция для получения ID
export function getUserAuthId(id) {
  userAuthId = id;
  console.log(userAuthId);
}
