import { filterFilmByBtn, openedFilmId } from '../modals/modal-film';
import {
  addMovieToWatched,
  removeMovieFromWatched,
  removeMovieFromQueue,
  removeMovieFromQueue,
} from './db-manipulations';
import { openModalAuth } from '../modals/modal-auth';
import { userIsNotSignInYet } from './sign-in';
import { removeW, addW, removeQ, addQ, moveW } from '../constants';

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

  if (btnTitle.trim() === addW) {
    addMovieToWatched(dataObj);
  } else if (btnTitle.trim() === removeW) {
    removeMovieFromWatched(dataObj);
  } else if (btnTitle.trim() === moveW) {
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

  if (btnTitle.trim() === addQ) {
    addMovieToQueue(data);
  } else if (btnTitle.trim() === removeQ) {
    removeMovieFromQueue(data);
  }
  filterFilmByBtn(openedFilmId);
}

function isUserSignIn(userId) {
  if (!userId) {
    openModalAuth();
    userIsNotSignInYet();

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
