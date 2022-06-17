import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { markupMoviesGallery } from "./js/template";
import { MoviesService } from './js/fetch';
import getRefs from './js/refs';

const refs = getRefs();

markupMoviesGallery();

export const pagination = new Pagination(refs.paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

function moviePagination(e) {
  MoviesService.page = e.page;
  refs.galleryList.innerHTML = '';
  markupMoviesGallery()
}

pagination.on('afterMove', moviePagination);
