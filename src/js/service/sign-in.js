import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { userSignOut } from './service-firebase';
import { signOutWrap, signOutBtn, form } from '../refs/refs';

function signOutBtnShow() {
  Notiflix.Notify.success('You are successfully authorized');
  signOutBtn.addEventListener('click', userSignOut);
  signOutWrap.classList.remove('is-hidden');
}

function signOutBtnHide() {
  Notiflix.Notify.warning('You are not authorized');
  signOutWrap.classList.add('is-hidden');
  signOutBtn.removeEventListener('click', userSignOut);
}

function errorSignInOrOut() {
  Notiflix.Notify.failure('Something went wrong. Please try again');
}

function errorSignIn(email) {
  Notiflix.Notify.failure(
    `User with mail ${email} not found. Please try again or register.`
  );
  form.reset();
}

function successSignInWithGoogle() {
  Notiflix.Notify.success('You are successfully authorized');
}

export {
  signOutBtnShow,
  signOutBtnHide,
  errorSignInOrOut,
  errorSignIn,
  successSignInWithGoogle,
};
