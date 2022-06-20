import refs from './refs';
import { userRegistration, userSignIn } from './service/service_fb';
import { closeModalAuth } from './modal-auth';

let formType = 'authorization';

function updateForm() {
  const conditionsInfo = document.querySelector('.js-conditions');

  if (formType === 'authorization') {
    formType = 'registration';
    conditionsInfo.removeAttribute('hidden', '');
  } else {
    formType = 'authorization';
    conditionsInfo.setAttribute('hidden', '');
  }

  const formTitle = formType === 'authorization' ? 'Sign In' : 'Registration';
  const formSwitchBtnText =
    formType === 'authorization' ? 'Registration' : 'Sign In';
  const textSubmit = formType === 'authorization' ? 'Sign In' : 'Register now';

  refs.formSwitchBtn.textContent = formSwitchBtnText;
  refs.formSubmitBtn.textContent = textSubmit;
  refs.formTitle.textContent = formTitle;
  refs.form.reset();
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, password } = evt.target.elements;

  console.log(formType);
  if (formType === 'registration') {
    userRegistration(email.value, password.value);
    updateForm();
  } else {
    userSignIn(email.value, password.value);
    closeModalAuth();
    // TODO і відкривається сторінка myLibrary
  }
}

export { onFormSubmit, updateForm };
