import throttle from 'lodash.throttle';
import { getTotalPage, pagination, moviePagination, scrollTo, scrollToTopButton } from './js/pagination';
import { onSearchMovieByKeyword } from './js/searchMovies';
import { closeModalAuth } from './js/modal-auth';
import { onFormSubmit, updateForm } from './js/authForm';
import { userSignInWithGoogle } from './js/service/service_fb';
import { onFilterButtonClick } from './js/filter';
import { openModalFilm, closeModalFilm } from './js/modal-film';
import { onModalOpen, onClickBackdrop } from './js/modal-close';
import { togglePages, colorSwitch } from './js/my-library';
import { getWatchedFilms, getQueueFilm } from './js/render-gallery-my-library';

import refs from './js/refs';
//
refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);
refs.formSignInWithGoogle.addEventListener('click', userSignInWithGoogle);
refs.galleryList.addEventListener('click', openModalFilm);
refs.navbarBtn.addEventListener('click', togglePages);
refs.btnHome.addEventListener('click', colorSwitch);
refs.btnWatched.addEventListener('click', getWatchedFilms);
refs.btnQueue.addEventListener('click', getQueueFilm);

refs.modalDevBtn.addEventListener('click', onModalOpen);

refs.searchForm.addEventListener(
  'submit',
  throttle(onSearchMovieByKeyword, 1000)
);

refs.closeModalDevBtn.addEventListener('click', onModalOpen);
refs.backdrop.addEventListener('click', onClickBackdrop);

refs.searchForm.addEventListener('submit', onSearchMovieByKeyword);
refs.buttonWrap.addEventListener('click', onFilterButtonClick);

document.addEventListener('DOMContentLoaded', getTotalPage);
pagination.on('afterMove', moviePagination);

window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);