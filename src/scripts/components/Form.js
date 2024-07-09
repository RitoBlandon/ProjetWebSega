export default class Form {
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.html = document.documentElement;
    this.init();
  }

  init() {
    this.element.setAttribute('novalidate', '');
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }
    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('submit');
    if (this.validate()) {
      console.log('sucess');
      this.showConfirmation();
    } else {
      console.log('fail');
    }
  }
  /**
   * method description
   * @return {boolean} - statue de la validation
   */
  validate() {
    console.log('validate');
    let isValid = true;
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }
    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;
    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }
  removeError(input) {
    console.log('yo');
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
