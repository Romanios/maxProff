
//mobile-menu

const mobileBtn = document.querySelector('.header__open-btn');
const mobileMenu = document.querySelector('.header__nav');
const btnChange = document.querySelector('.header__open-el');
const mobilePresent = document.querySelector('.present');
// const mobiSwiperTop = document.querySelector('.swiperTop');

mobileBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
  mobileBtn.classList.toggle('active');
  btnChange.classList.toggle('active');
  mobilePresent.classList.toggle('mobile');

  // mobileWedo.classList.toggle('mobile');
  // mobiSwiperTop.classList.toggle('hidden');
})


// range slider
class Slider {
  constructor (rangeElement, valueElement, options) {
    this.rangeElement = rangeElement
    this.valueElement = valueElement
    this.options = options

    // Attach a listener to "change" event
    this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
  }

  // Initialize the slider
  init() {
    this.rangeElement.setAttribute('min', options.min)
    this.rangeElement.setAttribute('max', options.max)
    this.rangeElement.value = options.cur

    this.updateSlider()
  }

  // Format the money
  asMoney(value) {
    return ' ' + parseFloat(value)
      .toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  generateBackground(rangeElement) {
    if (this.rangeElement.value === this.options.min) {
      return
    }

    let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
    return 'background: linear-gradient(to right, #2d4872, #2d4872 ' + percentage + '%, #d1d1d1 ' + percentage + '%, #d1d1d1 100%)'
  }

  updateSlider (newValue) {
    this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
    this.rangeElement.style = this.generateBackground(this.rangeElement.value)
  }
}

let rangeElement = document.querySelector('.range [type="range"]')
let valueElement = document.querySelector('.range .range__value output')

let options = {
  min: 0,
  max: 200,
  cur: 35
}

if (rangeElement) {
  let slider = new Slider(rangeElement, valueElement, options)

  slider.init()
}

// tel validation
// inputMask
let inputTel = document.querySelector('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputTel);




// btm more (показать еще)
const moreBtn = document.querySelectorAll('.works__more');
const worksChange = document.querySelectorAll('.works__item--hidden');

moreBtn.forEach(function(item) {
  item.addEventListener('click', function() {
    this.nextElementSibling.classList.toggle("hidden");
  })
})


// инициализация .tabs как табов
    new ItcTabs('.tabs');

// Initialize Swiper

    var swiper = new Swiper(".mySwiper1", {
      // cssMode: true,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // mousewheel: true,
      keyboard: true,
      spaceBetween: 10,
    });

    // Initialize accordeon
    new ItcAccordion(document.querySelector('.accordion'), {
      alwaysOpen: false
    });