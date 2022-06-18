import { getTotalPage } from './js/pagination';
import { pagination, moviePagination } from './js/pagination';
import { closeModalAuth } from './js/modal-auth';
import { onFormSubmit, updateForm } from './js/authForm';
import { userSignInWithGoogle } from './js/service/service_fb';
import { onBtnClick } from './js/filter';
import refs from './js/refs';
//
refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);
refs.formSignInWithGoogle.addEventListener('click', userSignInWithGoogle);
//

refs.buttonPopular.addEventListener('click', onBtnClick)
refs.buttonTopRated.addEventListener('click', onBtnClick)
refs.buttonNowPlaying.addEventListener('click', onBtnClick)

document.addEventListener('DOMContentLoaded', getTotalPage);
pagination.on('afterMove', moviePagination);
