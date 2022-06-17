import { markupMoviesGallery } from "./js/template";
import { pagination } from './js/pagination';
import { moviePagination } from './js/pagination'
//

refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);
//
document.addEventListener('DOMContentLoaded', markupMoviesGallery);
pagination.on('afterMove', moviePagination);
