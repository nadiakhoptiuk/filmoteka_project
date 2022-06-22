import { modalFilmImg, modalFilmHtml } from '../refs/refs';
import { audit } from '../service/audit';

export function createModalFilm(ev) {
  const {
    original_title,
    title,
    vote_average,
    vote_count,
    poster_path,
    overview,
    popularity,
    genres,
  } = ev;
  const htmlImg = `<img src="https://image.tmdb.org/t/p/w500${poster_path === null ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg' : poster_path}" alt="poster ${title}" class="modal-film__img">`;
  const htmlPoint = `
            <h2 class="modal-film__name">${audit(title)}</h2>
            <div class="modal-film__rating">
                <div class="modal-film__list-name">
                    <p class="modal-film__item-name vote">Vote / Votes</p>
                    <p class="modal-film__item-name popularity">Popularity</p>
                    <p class="modal-film__item-name origin">Original Title</p>
                    <p class="modal-film__item-name genre">Genre</p>
                </div>
                <div class="modal-film__list-description">
                    <p class="modal-film__item-description vote"><span class="modal-film--style">${audit(vote_average)}</span> / ${audit(vote_count)}</p>
                    <p class="modal-film__item-description popularity">${audit(popularity)}</p>
                    <p class="modal-film__item-description origin">${audit(original_title)}</p>
                    <p class="modal-film__item-description genre">${genres.flatMap(ev=> ev.name).join(", ")}</p >
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
