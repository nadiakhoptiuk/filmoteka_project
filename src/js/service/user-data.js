import { filterFilmByBtn, openedFilmId } from '../modals/modal-film';
import {
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
  removeMovieFromQueue,
} from './db-manipulations';
import { openModalAuth } from '../modals/modal-auth';
import { showNotifyInfo } from './notifications';
import { removeW, addW, removeQ, addQ } from '../constants';

let userId = null;
let chosenMovie = null;

function getUserId(id) {
  userId = id;
}

//повертає об'єкт фільму з модалки
function getMovieData(data) {
  chosenMovie = data;
}

// функція, яка запускається при кліку по кнопці в модальному вікні фільму (додати до списку переглянутих)
function onAddToWatchedBtnClick(evt) {
  const dataObj = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (!isUserSignIn(userId)) {
    return;
  }

  // додає або видаляє зі списку переглянутих бази даних фільм
  if (btnTitle.trim() === addW) {
    addMovieToWatched(dataObj);
  } else if (btnTitle.trim() === removeW) {
    removeMovieFromWatched(dataObj);
  }
  // console.log(openedFilmId);
  filterFilmByBtn(openedFilmId);
  // console.log(openedFilmId);
}

// функція, яка запускається при кліку по кнопці в модальному вікні фільму (додати до списку черги)
function onAddToQueueBtnClick(evt) {
  const data = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (!isUserSignIn(userId)) {
    return;
  }

  // додає або видаляє зі списку черги бази даних фільм
  if (btnTitle.trim() === addQ) {
    addMovieToQueue(data);
  } else if (btnTitle.trim() === removeQ) {
    removeMovieFromQueue(data);
  }
  // console.log(openedFilmId);
  filterFilmByBtn(openedFilmId);
  // console.log(openedFilmId);
}

// функція, яка перевіряє, чи користувач залогінений і у разі, якщо ні, відкриває модальне вікно входу
function isUserSignIn(userId) {
  if (!userId) {
    openModalAuth();
    showNotifyInfo('Please sign in to your account or register');

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

export {
  getUserId,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
  chosenMovie,
  getMovieData,
};
