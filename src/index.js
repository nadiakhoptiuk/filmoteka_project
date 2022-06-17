import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { markupMoviesGallery } from './js/template';
import { MoviesService } from './js/fetch';
import refs from './js/refs';
import { onFormSubmit } from './js/authForm';
import { updateForm } from './js/authForm';
import { closeModalAuth } from './js/modal-auth';

//

refs.form.addEventListener('submit', onFormSubmit);
refs.formSwitchBtn.addEventListener('click', updateForm);
refs.modalAuthEl.addEventListener('click', closeModalAuth);

//
markupMoviesGallery();

async function getTotalPage() {
  const listMovies = await MoviesService.getMovies();
  let getList = listMovies.total_pages;
  if (getList > 1000) {
    getList = 1000;
  }
  pagination.reset(getList);
}

getTotalPage();

export const pagination = new Pagination(refs.paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

function moviePagination(e) {
  MoviesService.page = e.page;
  refs.galleryList.innerHTML = '';
  markupMoviesGallery();
}

pagination.on('afterMove', moviePagination);
