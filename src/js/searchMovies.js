import refs from "./refs";
import 'js-loading-overlay'
import { loadingSpinnerConfig } from "./pagination";
import { LoadMoreBtn } from "./loadMoreBtn";
import { MoviesService } from "./fetch";
import { markupMoviesGalleryBySearch } from "./markupSearchMovie";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  className: 'visually-hidden',
  isHide: true,
  callback: async (e) => {
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
      console.log(error)
    }
  }
})

export async function onSearchMovieByKeyword(e) {
  e.preventDefault();
  try {
    MoviesService.query = e.target.elements.searchQuery.value.trim();
    MoviesService.page = 1;
    JsLoadingOverlay.show(loadingSpinnerConfig);
    const { results, total_pages } = await MoviesService.getMoviesBySearch();
    refs.buttonWrap.classList.add('visually-hidden');
    refs.paginationWrapper.classList.add('visually-hidden');

    if (results.length === 0) {
      Notify.failure('Sorry, this request did not match.');
    }
    refs.galleryList.innerHTML = '';
    markupMoviesGalleryBySearch(results);
    JsLoadingOverlay.hide();
    if (total_pages > 1) {
      loadMoreBtn.show();
    }
    
  } catch (error) {
    console.log(error)
  }
}