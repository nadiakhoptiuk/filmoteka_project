import refs from './refs';
import { userRegistration, userSignIn } from './service/service_fb';
import { closeModalAuth } from './modal-auth';

let formType = 'registration';

function updateForm() {
  if (formType === 'registration') {
    formType = 'authorization';
  } else {
    formType = 'registration';
  }

  const formTitle = formType === 'registration' ? 'Registration' : 'Sign In';
  const formSwitchBtnText =
    formType === 'registration' ? 'Sign In' : 'Registration';
  const textSubmit = formType === 'registration' ? 'Register now' : 'Sign In';

  refs.formSwitchBtn.textContent = formSwitchBtnText;
  refs.formSubmitBtn.textContent = textSubmit;
  refs.formTitle.textContent = formTitle;
  refs.form.reset();
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, password } = evt.target.elements;

  console.log(evt.target);
  console.log(evt.currentTarget);
  console.log(formType);
  if (formType === 'registration') {
    userRegistration(email.value, password.value);
    updateForm();
  } else {
    userSignIn(email.value, password.value);
    // модалка закривається
    closeModalAuth();
    // TODO і відкривається сторінка myLibrary
  }
}

export { onFormSubmit, updateForm };
