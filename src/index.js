import { markupMoviesGallery } from './js/template';
import { pagination } from './js/pagination';
import { moviePagination } from './js/pagination';
import { closeModalAuth } from './js/modal-auth';
import { onFormSubmit } from './js/authForm';
import { updateForm } from './js/authForm';
import refs from './js/refs';
//
refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);
//

pagination.on('afterMove', moviePagination);

