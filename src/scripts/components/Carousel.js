import Swiper from 'swiper/bundle';
export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      pagination: {},
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };
    this.init();
  }
  init() {
    this.setOptions();
    var swiper = new Swiper(this.element, this.options);
  }

  setOptions() {
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        768: { slidesPerView: 3 },
        350: { slidesPerView: 1 },
      };
    }
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      };
    }

    if ('loop' in this.element.dataset) {
      this.options.loop = {
        loop: true,
      };
    }

    if ('slides' in this.element.dataset) {
      this.options.slidesPerView =
        this.element.dataset.slides || this.options.slidesPerView;
    }
  }
}
