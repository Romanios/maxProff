
//mobile-menu

const mobileBtn = document.querySelector('.header__open-btn');
const mobileMenu = document.querySelector('.header__nav');
const btnChange = document.querySelector('.header__open-el');
// const mobileWedo = document.querySelector('.wedo');
// const mobiSwiperTop = document.querySelector('.swiperTop');

mobileBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
  mobileBtn.classList.toggle('active');
  btnChange.classList.toggle('active');

  // mobileWedo.classList.toggle('mobile');
  // mobiSwiperTop.classList.toggle('hidden');
})