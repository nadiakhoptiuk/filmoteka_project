import { modalFilmImg, modalFilmHtml } from '../refs/refs';

export function createModalFilm(ev) {
  const {
    original_title,
    title,
    vote_average,
    vote_count,
    poster_path,
    overview,
    popularity,
    allGenres,
  } = ev;
  const htmlImg = `<img src="https://image.tmdb.org/t/p/w500${poster_path === null ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg' : poster_path}" alt="poster ${title}" class="modal-film__img">`;
  const htmlPoint = `
            <h2 class="modal-film__name">${title}</h2>
            <div class="modal-film__rating">
                <div class="modal-film__list-name">
                    <p class="modal-film__item-name">Vote / Votes</p>
                    <p class="modal-film__item-name">Popularity</p>
                    <p class="modal-film__item-name">Original Title</p>
                    <p class="modal-film__item-name">Genre</p>
                </div>
                <div class="modal-film__list-description">
                    <p class="modal-film__item-description"><span class="modal-film--style">${vote_average}</span> / ${vote_count}</p>
                    <p class="modal-film__item-description">${popularity}</p>
                    <p class="modal-film__item-description">${original_title}</p>
                    <p class="modal-film__item-description">${allGenres}</p >
                </div>
            </div>
            <h3 class="modal-film__title">ABOUT</h3>
            <p class="modal-film__description">${overview}</p>
       `;
  const img = modalFilmImg;
  const point = modalFilmHtml;
  img.innerHTML = htmlImg;
  point.innerHTML = htmlPoint;
}
