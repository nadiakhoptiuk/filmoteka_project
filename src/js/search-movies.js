import 'js-loading-overlay';
import { loadingSpinnerConfig } from './pagination/pagination';
import { LoadMoreBtn } from './pagination/load-more-btn';
import { MoviesService } from './service/service-fetch';
import { markupMoviesGalleryBySearch } from './templates/markup-search-movie';
import {
  searchButton,
  formTextErrSearch,
  buttonWrap,
  paginationWrapper,
  errorContainer,
  galleryList,
} from './refs/refs';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  className: 'visually-hidden',
  isHide: true,
  callback: async e => {
    try {
      JsLoadingOverlay.show(loadingSpinnerConfig);
      MoviesService.page += 1;
      const { results, total_pages } = await MoviesService.getMoviesBySearch();
      if (MoviesService.page === total_pages || results.length === 0) {
        loadMoreBtn.hide();
      }
      markupMoviesGalleryBySearch(results);
      JsLoadingOverlay.hide();
    } catch (error) {
      console.log(error);
    }
  },
});

export function onInputSearch(e) {
  if (e.target.value.trim().length >= 1) {
    searchButton.removeAttribute('disabled');
  }
  if (e.target.value.trim().length === 0) {
    searchButton.disabled = true;
  }
}

export async function onSearchMovieByKeyword(e) {
  e.preventDefault();
  try {
    formTextErrSearch.classList.add('visually-hidden');
    MoviesService.query = e.target.elements.searchQuery.value.trim();
    MoviesService.page = 1;
    JsLoadingOverlay.show(loadingSpinnerConfig);
    const { results, total_pages } = await MoviesService.getMoviesBySearch();
    buttonWrap.classList.add('visually-hidden');
    paginationWrapper.classList.add('visually-hidden');
    errorContainer.classList.add('visually-hidden');

    if (results.length === 0) {
      loadMoreBtn.hide();
      errorContainer.classList.remove('visually-hidden');
      formTextErrSearch.classList.remove('visually-hidden');
    }
    galleryList.innerHTML = '';
    markupMoviesGalleryBySearch(results);
    JsLoadingOverlay.hide();
    if (total_pages > 1) {
      loadMoreBtn.show();
    }
  } catch (error) {
    console.log(error);
  }
}
