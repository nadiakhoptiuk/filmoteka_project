import { MoviesService } from "./fetch";
import { markupMoviesGallery } from "./template";
import { pagination } from "./pagination";
import refs from "./refs";
import { pagination } from "./pagination";

export async function onFilterButtonClick(e) {
  MoviesService.param = e.target.dataset.id; // отримуємо дата-атрибут як параметр запиту для фетча
  MoviesService.page = 1; // початкова сторінка
  const response = await MoviesService.getMovies();
  refs.galleryList.innerHTML = '';
  let totalPages = response.total_pages;
  if (totalPages > 1000) {
   totalPages = 1000;
  }
  markupMoviesGallery(response.results);// відмальовуємо результат
  pagination.reset(totalPages) // скидаємо початкову сторінку для пагінації

  // перевірка на клас active та активну кнопку
  if (MoviesService.param === 'popular') {
    refs.buttonPopular.classList.add('btn-accent');
    refs.buttonNowPlaying.classList.remove('btn-accent');
    refs.buttonTopRated.classList.remove('btn-accent');

    isButtonDisabled(true, false, false);
  }
  if (MoviesService.param === 'top_rated') {
    refs.buttonTopRated.classList.add('btn-accent');
    refs.buttonNowPlaying.classList.remove('btn-accent');
    refs.buttonPopular.classList.remove('btn-accent');

    isButtonDisabled(false, true, false);
  }
  if (MoviesService.param === 'now_playing') {
    refs.buttonNowPlaying.classList.add('btn-accent');
    refs.buttonTopRated.classList.remove('btn-accent');
    refs.buttonPopular.classList.remove('btn-accent');

    isButtonDisabled(false, false, true);
  }
}

// функція для перевірки кнопки
function isButtonDisabled (popularBtn, topRated, nowPlaying) {
  refs.buttonPopular.disabled = popularBtn;   
  refs.buttonTopRated.disabled = topRated;
  refs.buttonNowPlaying.disabled = nowPlaying;
}