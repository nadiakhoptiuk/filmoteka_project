import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, set } from 'firebase/database';

import { firebaseConfig } from '../settings/fb-config';
const app = initializeApp(firebaseConfig);
const db = getDatabase();

let userId = null;

function getUserIdFromDB(id) {
  userId = id;
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
  getUserIdFromDB,
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
  db,
};
