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
  loader: document.querySelector('.ring'),

  btnCloseFilm: document.querySelector('.modal-film__btn'),
  body: document.querySelector("body")
};

export default refs;
