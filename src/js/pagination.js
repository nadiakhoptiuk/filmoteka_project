import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import 'js-loading-overlay'
import { MoviesService } from '../js/fetch';
import { markupMoviesGallery } from './renderMarkupGallery';
import refs from '../js/refs';

// configs for spinner loader
export const loadingSpinnerConfig = {
  "overlayBackgroundColor": "#666666",
  "overlayOpacity": 0.2,
  "spinnerIcon": "ball-grid-pulse",
  "spinnerColor": "#ff6b08",
  "spinnerSize": "3x",
  "offsetY": 0,
  "overlayZIndex": 10,
  "spinnerZIndex": 20
}

// Function for getting quantity of pages and render markup for home page('Popular')
export async function getTotalPage() {
  JsLoadingOverlay.show(loadingSpinnerConfig);
  try {
    const listOfMovies = await MoviesService.getMovies();
    const getListOfMovies = listOfMovies.results;
    let quantityOfPages = listOfMovies.total_pages;
    if (quantityOfPages > 1000) quantityOfPages = 1000;
    
    JsLoadingOverlay.hide();
    markupMoviesGallery(getListOfMovies);

    refs.buttonWrap.classList.remove('visually-hidden');
    refs.paginationWrapper.classList.remove('visually-hidden');

    pagination.reset(quantityOfPages);

    if (MoviesService.param === 'popular') refs.buttonPopular.disabled = true;

  } catch (error) {
    console.log(error.message)
  }
}

// Create new instance for pagination
export const pagination = new Pagination(refs.paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

// Function for pagination and render markup after move
export async function moviePagination(e) {
  try {
    MoviesService.page = e.page;
    JsLoadingOverlay.show(loadingSpinnerConfig);
    const {results} = await MoviesService.getMovies();
    refs.galleryList.innerHTML = '';
    JsLoadingOverlay.hide();
    markupMoviesGallery(results);
    scrollTo();
  } catch (error) {
    console.log(error.message)
  }
}

// Function for scroll to top(gallery) after move
export function scrollTo() {
  window.scrollTo({ top: 20, behavior: 'smooth' });
}

export function scrollToTopButton() {
  if (window.scrollY > 600) {
    refs.backToTopBtn.classList.remove('visually-hidden');
  } else {
    refs.backToTopBtn.classList.add('visually-hidden');
  }
}