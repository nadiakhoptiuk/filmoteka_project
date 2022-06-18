import { getTotalPage } from './js/pagination';
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

document.addEventListener('DOMContentLoaded', getTotalPage)
pagination.on('afterMove', moviePagination);

