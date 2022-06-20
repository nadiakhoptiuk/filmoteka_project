const refs = {
  galleryList: document.querySelector('.gallery__list'),
  paginationRef: document.querySelector('#tui-pagination-container'),

  formTitle: document.querySelector('.js-form-auth__title'),
  form: document.querySelector('.js-form-auth'),
  formInputEmail: document.querySelector('.js-input__email'),
  formInputPass: document.querySelector('.js-input__pass'),
  formSubmitBtn: document.querySelector('.js-form__submit'),
  formSwitchBtn: document.querySelector('.js-form__type-switch'),
  formSignInWithGoogle: document.querySelector('.js-sign-google'),

  signOutBtn: document.querySelector('.js-sign-out-btn'),
  signOutWrap: document.querySelector('#sign_out'),

  modalAuthEl: document.querySelector('.modal-auth__btn-close'),
  overlayEl: document.querySelector('.overlay-auth'),
  galleryWatchedList: document.querySelector('.gallery-watched__list'),
  galleryQueueList: document.querySelector('.gallery-queue__list'),
  btnWatched: document.querySelector('.button.watched'),
  btnQueue: document.querySelector('.button.queued'),

  buttonWrap: document.querySelector('.button-wrap'),
  buttonPopular: document.querySelector('[data-id="popular"]'),
  buttonTopRated: document.querySelector('[data-id="top_rated"]'),
  buttonNowPlaying: document.querySelector('[data-id="now_playing"]'),
  paginationWrapper: document.querySelector('.pagination-wrapper'),

  btnCloseFilm: document.querySelector('.modal-film__btn'),
  modalFilmImg: document.querySelector('.modal-film__img-cont'),
  modalFilmHtml: document.querySelector('.modal-film--add'),
  body: document.body,

  addToWatchedBtn: document.querySelector('#add-to-watched'),
  addToQueueBtn: document.querySelector('#add-to-queue'),
};

export default refs;
