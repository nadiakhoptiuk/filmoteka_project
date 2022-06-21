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
import { firebaseConfig } from '../settings/fb_config';
import { closeModalAuth } from '../modal-auth';
import { getUserId } from '../user-data';
import refs from '../refs';
import { getUserAuthId } from '../render-gallery-my-library';

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
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function userSignIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      console.log(user);

      const user = userCredential.user;
      refs.signOutBtn.addEventListener('click', userSignOut);
      refs.signOutWrap.classList.remove('is-hidden');
    })
    .catch(error => {
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
      // The signed-in user info.
      const user = result.user;
      closeModalAuth();

      console.log(user);

      // ...
    })
    .catch(error => {
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
    getUserAuthId(uid);
    refs.signOutBtn.addEventListener('click', userSignOut);
    refs.signOutWrap.classList.remove('is-hidden');

    console.log(uid);
    console.log(user);

    // ...
  } else {
    console.log(null);
    getUserId(null);
    getUserAuthId(null);
    // User is signed out
    // ...
  }
});

function userSignOut(evt) {
  signOut(auth)
    .then(() => {
      refs.signOutWrap.classList.add('is-hidden');
      refs.signOutBtn.removeEventListener('click', userSignOut);
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

export { userRegistration, userSignIn, userSignInWithGoogle };
