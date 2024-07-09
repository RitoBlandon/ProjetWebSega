export default class Accordion {
  constructor(element) {
    this.element = element;
    this.accordions = this.element.querySelectorAll('.js-accordion');
    this.options = {
      notClosing: false,
      autoOpen: false,
    };

    this.html = document.documentElement;
    this.init();
  }

  init() {
    this.setOptions();
    this.autoOpenAccordions = this.element.querySelectorAll('[data-auto-open]');

    for (let i = 0; i < this.accordions.length; i++) {
      const element = this.accordions[i];
      element.addEventListener('click', this.onToggleAccordion.bind(this));
      if (element.dataset.autoOpen != undefined) {
        element.classList.add('is-active');
      }
    }
  }
  setOptions() {
    if ('notClosing' in this.element.dataset) {
      this.options.notClosing = true;
    }
  }
  onToggleAccordion(event) {
    const accordionCliquer = event.currentTarget;

    for (let i = 0; i < this.accordions.length; i++) {
      const accordion = this.accordions[i];
      // On vien vérifier si l'index de l'accordion dans la boucle est le meme que celui cliquer

      if (accordionCliquer == accordion) {
        accordion.classList.toggle('is-active');
      } else if (
        !this.options.notClosing &&
        accordion.classList.contains('is-active') &&
        this.autoOpenAccordions.length <= 1
      ) {
        accordion.classList.remove('is-active');
      }
    }
  }
}
