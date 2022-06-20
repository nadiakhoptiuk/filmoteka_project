import refs from './refs';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from './user-data';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import moment from 'moment';

export let userAuthId = 'null';

//  Функция забирает Watched фильмы из стораджа
function getWatchedFilms() {
  const getWathed = ref(db, `pWLCEH2UHFfUjThU7uvvfA4Jreu2` + '/watched');
  onValue(getWathed, snapshot => {
    const data = snapshot.val();
    const watchedFilms = Object.values(data);
    renderWatchedGallery(watchedFilms, 'queue');
  });
}

//  Функция забирает Queue фильмы из стораджа
function getQueueFilm() {
  const getQueue = ref(db, `pWLCEH2UHFfUjThU7uvvfA4Jreu2` + '/queue');
  onValue(getQueue, snapshot => {
    const data = snapshot.val();
    const queuedFilms = Object.values(data);
    renderWatchedGallery(queuedFilms, 'watched');
  });
}

// Функция рендерит Wathed Gallery
async function renderWatchedGallery(data, nameGallery) {
  try {
    const markup = data
      .map(item => {
        return `<li class="card">
        <a href="#" data-id="${item.movie.id}">
          <img
            class="card__img" loading="lazy"
            src="https://image.tmdb.org/t/p/original/${item.movie.poster_path}"
            alt="${item.movie.title}"
          />
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
      refs.galleryWatchedList.innerHTML = '';
      refs.galleryWatchedList.innerHTML = markup;
    }
    if (nameGallery === 'queue') {
      refs.galleryQueueList.innerHTML = '';
      refs.galleryQueueList.innerHTML = markup;
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

// Функция для переключения стилей кнопок Watched и Queue
function changeMyLibraryBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('active');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('active');
  disabledButton.removeAttribute('disabled', 'disabled');
}

// Функция для получения ID
export function getUserAuthId(id) {
  userAuthId = id;
  console.log(userAuthId);
}
