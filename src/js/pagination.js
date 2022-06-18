import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { MoviesService } from '../js/fetch';
import { markupMoviesGallery } from './template';
import refs from '../js/refs';

export async function getTotalPage() {
  try {
    const listOfMovies = await MoviesService.getMovies();
    const getListOfMovies = listOfMovies.results;
    let quantityOfPages = listOfMovies.total_pages;
    if (quantityOfPages > 1000) {
      quantityOfPages = 1000;
    }
    markupMoviesGallery(getListOfMovies);
    pagination.reset(quantityOfPages);
  } catch (error) {
    console.log(error.message)
  }
}

export const pagination = new Pagination(refs.paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

export async function moviePagination(e) {
  try {
    MoviesService.page = e.page;
    const {results} = await MoviesService.getMovies();
    refs.galleryList.innerHTML = '';
    markupMoviesGallery(results);
    scrollTo();
  } catch (error) {
    console.log(error.message)
  }
}

function scrollTo() {
  window.scrollTo({ top: 230, behavior: 'smooth' });
}