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
  Notiflix.Notify.warning('You have signed out');
  signOutWrap.classList.add('is-hidden');
  signOutBtn.removeEventListener('click', userSignOut);
}

function errorSignInOrOut() {
  Notiflix.Notify.failure('Something went wrong. Please try again');
}

function errorSignIn(email) {
  Notiflix.Notify.failure(
    `Wrong email or password. Please try again or register.`
  );

}

function successSignInWithGoogle() {
  Notiflix.Notify.success('You are successfully authorized');
}

function userIsNotSignInYet() {
  Notiflix.Notify.info('Please sign in to your account or register');
}

export {
  signOutBtnShow,
  signOutBtnHide,
  errorSignInOrOut,
  errorSignIn,
  successSignInWithGoogle,
  userIsNotSignInYet,
};
