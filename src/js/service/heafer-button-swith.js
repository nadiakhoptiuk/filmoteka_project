// Функция для переключения стилей кнопок Watched и Queue
export function changeMyLibraryBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('active');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('active');
  disabledButton.removeAttribute('disabled', 'disabled');
}

// Функция для переключения стилей кнопок Home и My Library
export function changeHeaderBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('nav-link--current');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('nav-link--current');
  disabledButton.removeAttribute('disabled', 'disabled');
}
