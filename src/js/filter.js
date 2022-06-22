import 'js-loading-overlay';
import { pagination } from './pagination/pagination';
import { loadingSpinnerConfig } from './settings/spinner-config';
import { MoviesService } from './service/service-fetch';
import { markupMoviesGallery } from './templates/render-markup-gallery';
import { popular, topRated, nowPlaying } from './constants';
import {
  galleryList,
  buttonWrap,
  buttonPopular,
  buttonTopRated,
  buttonNowPlaying,
} from './refs/refs';

//Function for render markup after click on filter button
export async function onFilterButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  MoviesService.param = e.target.dataset.id;
  MoviesService.page = 1;

  JsLoadingOverlay.show(loadingSpinnerConfig);

  const response = await MoviesService.getMovies();
  galleryList.innerHTML = '';

  let totalPages = response.total_pages;
  if (totalPages > 1000) totalPages = 1000;

  JsLoadingOverlay.hide();

  markupMoviesGallery(response.results);
  pagination.reset(totalPages);

  removeClassAccentFromButton();
  e.target.classList.add('btn-accent');

  if (MoviesService.param === popular)
    setButtonAttribute(true, false, false);
  if (MoviesService.param === topRated)
    setButtonAttribute(false, true, false);
  if (MoviesService.param === nowPlaying)
    setButtonAttribute(false, false, true);
}

// Function for removing accent class
function removeClassAccentFromButton() {
  const activeButton = buttonWrap.querySelector('.btn-accent');

  if (activeButton) activeButton.classList.remove('btn-accent');
}

// Function for add/remove button attribute
function setButtonAttribute(popularBtn, topRated, nowPlaying) {
  buttonPopular.disabled = popularBtn;
  buttonTopRated.disabled = topRated;
  buttonNowPlaying.disabled = nowPlaying;
}
