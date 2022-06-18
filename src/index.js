import { getTotalPage } from './js/pagination';
import { pagination, moviePagination } from './js/pagination';
import { closeModalAuth } from './js/modal-auth';
import { onFormSubmit, updateForm } from './js/authForm';
import { userSignInWithGoogle } from './js/service/service_fb';
import { onFilterButtonClick } from './js/filter';
import { openModalFilm, closeModalFilm } from './js/modal-film';
import { onAddToWatchedBtnClick, onAddToQueueBtnClick } from './js/user-data';
import refs from './js/refs';
//
refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);
refs.formSignInWithGoogle.addEventListener('click', userSignInWithGoogle);
refs.galleryList.addEventListener('click', openModalFilm);
refs.btnCloseFilm.addEventListener('click', closeModalFilm);
refs.addToWatchedBtn.addEventListener('click', onAddToWatchedBtnClick);
refs.addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);

//

refs.buttonWrap.addEventListener('click', onFilterButtonClick);

document.addEventListener('DOMContentLoaded', getTotalPage);
pagination.on('afterMove', moviePagination);
