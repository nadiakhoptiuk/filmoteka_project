import 'js-loading-overlay';
import { loadingSpinnerConfig } from './pagination';
import { MoviesService } from "./fetch";
import { markupMoviesGallery } from "./renderMarkupGallery";
import { pagination } from "./pagination";
import refs from "./refs";
import { pagination } from "./pagination";

//Function for render markup after click on filter button
export async function onFilterButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  MoviesService.param = e.target.dataset.id;
  MoviesService.page = 1;

  JsLoadingOverlay.show(loadingSpinnerConfig);
 
  const response = await MoviesService.getMovies();
  refs.galleryList.innerHTML = '';

  let totalPages = response.total_pages;
  if (totalPages > 1000) totalPages = 1000;

  JsLoadingOverlay.hide();

  markupMoviesGallery(response.results);
  pagination.reset(totalPages);
  
  removeClassAccentFromButton();
  e.target.classList.add('btn-accent');

  if (MoviesService.param === 'popular') setButtonAttribute(true, false, false);
  if (MoviesService.param === 'top_rated') setButtonAttribute(false, true, false);
  if (MoviesService.param === 'now_playing') setButtonAttribute(false, false, true);
}

// Function for removing accent class
function removeClassAccentFromButton() {
  const activeButton = refs.buttonWrap.querySelector('.btn-accent');

  if (activeButton) activeButton.classList.remove('btn-accent');
}

// Function for add/remove button attribute
function setButtonAttribute (popularBtn, topRated, nowPlaying) {
  refs.buttonPopular.disabled = popularBtn;   
  refs.buttonTopRated.disabled = topRated;
  refs.buttonNowPlaying.disabled = nowPlaying;
}