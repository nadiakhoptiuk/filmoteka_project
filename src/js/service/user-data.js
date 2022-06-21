import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, set } from 'firebase/database';
import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { filterFilmByBtn, openedFilmId } from '../modals/modal-film';

import { firebaseConfig } from '../settings/fb-config';
import { openModalAuth } from '../modals/modal-auth';

const app = initializeApp(firebaseConfig);
const db = getDatabase();

let userId = null;
let chosenMovie = null;

function getUserId(id) {
  userId = id;
}

function getMovieData(data) {
  //повертає об'єкт фільму з модалки
  chosenMovie = data;
}

function onAddToWatchedBtnClick(evt) {
  const dataObj = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (!isUserSignIn(userId)) {
    return;
  }

  if (btnTitle.trim() === 'add to watched') {
    addMovieToWatched(dataObj);
  } else if (btnTitle.trim() === 'remove from watched') {
    removeMovieFromWatched(dataObj);
  } else if (btnTitle.trim() === 'move to watched') {
    removeMovieFromQueue(dataObj);
    addMovieToWatched(dataObj);
  }
  filterFilmByBtn(openedFilmId);
}

function onAddToQueueBtnClick(evt) {
  const data = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (!isUserSignIn(userId)) {
    return;
  }

  if (btnTitle.trim() === 'add to queue') {
    addMovieToQueue(data);
  } else if (btnTitle.trim() === 'remove from queue') {
    removeMovieFromQueue(data);
  }
  filterFilmByBtn(openedFilmId);
}

function isUserSignIn(userId) {
  if (!userId) {
    openModalAuth();
    Notiflix.Notify.info('Please sign in to your account or register');

    return false;
  }
  return true;
}

// функція, яка створює об'єкт для бази даних, додаючи ід користувача
function createMovieData(movieObj, userId) {
  return {
    movie: movieObj,
    id: userId,
  };
}

// функція, яка додає у базу даних об'єкт з даними
function addMovieToWatched(data) {
  set(ref(db, userId + '/watched/' + data.movie.id), data);
}

function addMovieToQueue(data) {
  set(ref(db, userId + '/queue/' + data.movie.id), data);
}

function removeMovieFromWatched(data) {
  const folder = 'watched';
  const movieId = data.movie.id;
  removeMovieById(folder, movieId);
}

function removeMovieFromQueue(data) {
  const folder = 'queue';
  const movieId = data.movie.id;
  removeMovieById(folder, movieId);
}

function removeMovieById(folder, movieId) {
  const removedMovieData = {};
  removedMovieData[userId + '/' + folder + '/' + movieId] = null;

  return update(ref(db), removedMovieData);
}

export {
  getUserId,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
  chosenMovie,
  getMovieData,
  db,
};
