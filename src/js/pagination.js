import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { MoviesService } from '../js/fetch';
import { markupMoviesGallery } from './template';
import refs from '../js/refs';

export async function getTotalPage() {
  const listOfMovies = await MoviesService.getMovies();
  const getListOfMovies = await listOfMovies.results;
  let getList = listOfMovies.total_pages;
  if (getList > 1000) {
    getList = 1000;
  }
  markupMoviesGallery(getListOfMovies)
  pagination.reset(getList);
}

export const pagination = new Pagination(refs.paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

export async function moviePagination(e) {
  MoviesService.page = e.page;
  const {results} = await MoviesService.getMovies();
  refs.galleryList.innerHTML = '';
  markupMoviesGallery(results);
  scrollTo()
}

function scrollTo() {
  window.scrollTo({ top: 230, behavior: 'smooth' });
}