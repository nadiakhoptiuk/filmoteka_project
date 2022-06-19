import { MoviesService } from "./fetch";
import { markupMoviesGallery } from "./template";
import { pagination } from "./pagination";
import refs from "./refs";
import { pagination } from "./pagination";

export async function onFilterButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
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
  
  removeClassAccentFromButton(); //знімаємо клас з натиснутої кнопки
  e.target.classList.add('btn-accent');// додаємо клас на активну кнопку

  // перевірка на клас active та активну кнопку
  if (MoviesService.param === 'popular') {
    isButtonDisabled(true, false, false);
  }
  if (MoviesService.param === 'top_rated') {
    isButtonDisabled(false, true, false);
  }
  if (MoviesService.param === 'now_playing') {
    isButtonDisabled(false, false, true);
  }
}

// функція для видалення класу
function removeClassAccentFromButton() {
  const activeButton = refs.buttonWrap.querySelector('.btn-accent');

  if (activeButton) {
    activeButton.classList.remove('btn-accent');
  }
}

// функція для перевірки кнопки
function isButtonDisabled (popularBtn, topRated, nowPlaying) {
  refs.buttonPopular.disabled = popularBtn;   
  refs.buttonTopRated.disabled = topRated;
  refs.buttonNowPlaying.disabled = nowPlaying;
}