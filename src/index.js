import { markupMoviesGallery } from './js/template';
import { pagination } from './js/pagination';
import { moviePagination } from './js/pagination';
import { closeModalAuth } from './js/modal-auth';
import { onFormSubmit } from './js/authForm';
import { updateForm } from './js/authForm';
//

refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);
//
document.addEventListener('DOMContentLoaded', markupMoviesGallery);
pagination.on('afterMove', moviePagination);
