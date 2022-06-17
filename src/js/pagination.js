import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { MoviesService } from '../js/fetch';
import { markupMoviesGallery } from './template';
import refs from '../js/refs';

getTotalPage()

export async function getTotalPage() {
  const listMovies = await MoviesService.getMovies();
  let getList = listMovies.total_pages;
  if (getList > 1000) {
    getList = 1000;
  }
  pagination.reset(getList);
}

export const pagination = new Pagination(refs.paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

export function moviePagination(e) {
  MoviesService.page = e.page;
  refs.galleryList.innerHTML = '';
 
  markupMoviesGallery();
}

