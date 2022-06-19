import { initializeApp } from 'firebase/app';
import Notiflix from 'notiflix';

import { firebaseConfig } from './settings/fb_config';
import { getDatabase, ref, push } from 'firebase/database';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const app = initializeApp(firebaseConfig);
const db = getDatabase();

let userId = null;
let chosenMovie = null;

function getUserId(id) {
  userId = id;
}

// функція, яка забирає дані про фільм і ід користувача, може викликатись при кліку на кнопку модалки
function getMovieData(data) {
  //повертає обєкт фільма з модалки
  chosenMovie = data;
}

function onAddToWatchedBtnClick(evt) {
  const data = createMovieData(chosenMovie, userId);
  console.log(data);

  if (isUserSignIn(data) && isNotInListYet(evt)) {
    addMovieToWatched(data);
  }
  // для тесту бд
  addMovieToWatched(data);
}

function onAddToQueueBtnClick(evt) {
  const data = createMovieData(chosenMovie, userId);
  if (isUserSignIn(data) && isNotInListYet(evt)) {
    addMovieToQueue(data);
  }
  // для тесту бд
  addMovieToQueue(data);
}

function isUserSignIn(data) {
  console.log(data.id);

  if (data.id === null) {
    Notiflix.Notify.info('Please sign in to your account or register');
    // TODO відкрити модалку з входом?
    return false;
  }
  return true;
}

function isNotInListYet(evt) {
  if (evt.currentTarget.hasAttribute('disable')) {
    Notiflix.Notify.info('<Title> is already in list Watched');

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
  push(ref(db, 'movies/watched/'), data);
}

function addMovieToQueue(data) {
  push(ref(db, 'movies/queue/'), data);
}

export {
  getUserId,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
  chosenMovie,
  getMovieData,
};
