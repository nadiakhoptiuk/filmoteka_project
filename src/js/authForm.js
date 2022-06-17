import refs from './refs';

let formType = 'registration';

console.log(refs.formSubmitBtn);
console.log(refs.formTitle);

function updateForm() {
  if (formType === 'registration') {
    formType = 'authorization';
  } else {
    formType = 'registration';
  }
  console.log(formType);

  const formTitle = formType === 'registration' ? 'Registration' : 'Sign In';
  const formSwitchBtnText =
    formType === 'registration' ? 'Sign In' : 'Registration';
  const textSubmit = formType === 'registration' ? 'Register now' : 'Sign In';

  refs.formSwitchBtn.textContent = formSwitchBtnText;
  refs.formSubmitBtn.textContent = textSubmit;
  refs.formTitle.textContent = formTitle;
}

function onFormSubmit(evt) {
  console.log(evt.target);
}

export { onFormSubmit, updateForm };
