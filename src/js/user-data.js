import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, set } from 'firebase/database';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { firebaseConfig } from './settings/fb_config';
import { openModalAuth } from './modal-auth';

const app = initializeApp(firebaseConfig);
export const db = getDatabase();

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
  const data = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (isUserSignIn(userId) && btnTitle.trim() === 'add to watched') {
    addMovieToWatched(data);
  }
  if (isUserSignIn(userId) && btnTitle.trim() === 'remove from watched') {
    removeMovieFromWatched(data);
  }
  if (isUserSignIn(userId) && btnTitle.trim() === 'move to watched') {
    removeMovieFromQueue(data);
    addMovieToWatched(data);
  }
}

function onAddToQueueBtnClick(evt) {
  const data = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (isUserSignIn(userId) && btnTitle.trim() === 'add to queue') {
    addMovieToQueue(data);
  }
  
  if (isUserSignIn(userId) && btnTitle.trim() === 'remove from queue') {
    removeMovieFromQueue(data);
  }
}

function isUserSignIn(userId) {
  if (userId === null) {
    Notiflix.Notify.info('Please sign in to your account or register');
    // TODO відкрити модалку з входом?
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
};
