const btn = document.querySelector('.footer__btn');
const closeBtn = document.querySelector('.close-footer-modal');
const backdrop = document.querySelector('.backdrop');
const body = document.querySelector('body');

btn.addEventListener('click', onClick);
closeBtn.addEventListener('click', onClick);

function onClick() {
  if (backdrop.hasAttribute('hidden')) {
    backdrop.removeAttribute('hidden');
  } else {
    backdrop.setAttribute('hidden', true);
  }
  body.classList.toggle('hidden');
}