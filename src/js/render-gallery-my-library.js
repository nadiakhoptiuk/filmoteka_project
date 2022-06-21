import refs from './refs';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from './user-data';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import moment from 'moment';
export let watchedFilmsData = null;
export let queuedFilmsData = null;
export let userAuthId = 'null';

//  Функция забирает Watched фильмы из стораджа
export function getWatchedFilms(userKey) {
  console.log('RENDER WATCHED');
  const getWatched = ref(db, `${userKey}` + '/watched');

  onValue(getWatched, snapshot => {
    const data = snapshot.val();
    if (!data) {
      refs.galleryWatchedList.innerHTML =
        '<p class="no-films-in-list">You haven`t added anything yet...</p>';
      return;
    }
    const watchedFilms = Object.values(data);
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
      refs.galleryWatchedList.innerHTML =
        '<p class="no-films-in-list">You haven`t added anything yet...</p>';
      return;
    }
    const queuedFilms = Object.values(data);
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
        <a href="#" data-id="${item.movie.id}">
          <picture>
        <source
          srcset="https://image.tmdb.org/t/p/w780/${item.movie.poster_path}"
          media="(min-width: 1280px)"
        />
        <source
          media="(min-width: 768px)"
          srcset="https://image.tmdb.org/t/p/w500/${item.movie.poster_path}"
        />
        <source
          media="(min-width: 320px)"
          srcset="https://image.tmdb.org/t/p/w342/${item.movie.poster_path}"
        />
        <img
          srcset="https://image.tmdb.org/t/p/w342/${item.movie.poster_path}"
          src="https://image.tmdb.org/t/p/w342/${item.movie.poster_path}"
          alt="${item.movie.title}"
          class="card__img" loading="lazy"
        />
      </picture>
          <h2 class="card__title">${item.movie.title}</h2>
          <p class="card__description" data-id="${item.movie.id}">
            <span class="card__genre tooltip">${
              item.movie.previewGenres
            } <span class="tooltiptext">${
          item.movie.allGenres
        }</span> | ${moment(item.movie.release_date).format('YYYY')}</span>
            <span class="card__rating">${item.movie.vote_average}</span>
          </p>
        </a>
      </li>`;
      })
      .join('');

    if (nameGallery === 'watched') {
      refs.galleryQueueList.innerHTML = '';
      refs.galleryWatchedList.innerHTML = '';
      refs.galleryWatchedList.innerHTML = markup;
    }
    if (nameGallery === 'queue') {
      refs.galleryWatchedList.innerHTML = '';
      refs.galleryQueueList.innerHTML = '';
      refs.galleryQueueList.innerHTML = markup;
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
