import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from '../settings/fb-config';
import { closeModalAuth, openModalAuth } from '../modals/modal-auth';
import { getUserId } from '../service/user-data';
import { getUserIdFromDB } from './db-manipulations';
import {
  signOutBtnShow,
  signOutBtnHide,
  errorSignInOrOut,
  errorSignIn,
  successSignInWithGoogle,
} from '../service/sign-in';
import { getUserAuthId } from '../templates/render-gallery-my-library';
import { getUserIdAfterSignIn } from '../modals/auth-form';
import { signOutBtn, signOutWrap } from '../refs/refs';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function userRegistration(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch(error => {
      errorSignInOrOut();
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function userSignIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      signOutBtnShow();
      closeModalAuth();
    })
    .catch(error => {
      errorSignIn(email);
      openModalAuth();
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function userSignInWithGoogle(evt) {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      successSignInWithGoogle();
      // The signed-in user info.
      const user = result.user;
      closeModalAuth();

      console.log(user);

      // ...
    })
    .catch(error => {
      errorSignInOrOut();
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    getUserId(uid);
    getUserIdFromDB(uid);
    getUserAuthId(uid);
    getUserIdAfterSignIn(uid);
    signOutBtn.addEventListener('click', userSignOut);
    signOutWrap.classList.remove('is-hidden');

    console.log(uid);

    // ...
  } else {
    console.log(null);
    getUserId(null);
    getUserIdFromDB(null);
    getUserAuthId(null);
    getUserIdAfterSignIn(null);
    // User is signed out
    // ...
  }
});

function userSignOut(evt) {
  signOut(auth)
    .then(() => {
      console.log('hi');
      signOutBtnHide();
      // Sign-out successful.
    })
    .catch(error => {
      errorSignInOrOut();
      // An error happened.
    });
}

export { userRegistration, userSignIn, userSignInWithGoogle, userSignOut };
