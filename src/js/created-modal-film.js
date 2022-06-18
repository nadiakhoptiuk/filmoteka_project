export function createModalFilm(ev) {
    const object = ev[0]
      const { original_title, title, vote_average, vote_count, poster_path, overview, popularity, allGenres
    } = object;
    const htmlPoint = `
     
    <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster ${title}" class="modal-film__img">
    <div>
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
            <div class="modal-film__buttons">
                <button type="button" class="modal-film__to-watcheed btn btn-accent" id="add-to-watched">add to Watched</button>
                <button type="button" class="modal-film__to-queue btn btn-light" id="add-to-queue">add to queue</button>
            </div>
        </div>
       `
    const modalFilm = document.querySelector(".modal-film--add");
    modalFilm.innerHTML = htmlPoint;
 }