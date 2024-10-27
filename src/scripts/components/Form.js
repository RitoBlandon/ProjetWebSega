export default class Form {
  constructor(element) {
    this.element = element; // Formulaire passé en paramètre
    this.formElements = this.element.elements; // Récupère tous les éléments du formulaire

    this.html = document.documentElement; // Récupère l'élément <html> pour de potentielles manipulations globales
    this.init(); // Appelle la méthode d'initialisation
  }

  // Initialise les attributs et les événements
  init() {
    this.element.setAttribute('novalidate', ''); // Désactive la validation HTML par défaut

    // Ajoute un écouteur d'événements 'input' pour chaque champ requis du formulaire
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this)); // Valide les champs requis en temps réel
      }
    }

    // Ajoute un écouteur d'événements 'submit' au formulaire
    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  // Gère la soumission du formulaire
  onSubmit(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire
    console.log('submit');

    // Valide le formulaire et affiche un message en fonction du résultat
    if (this.validate()) {
      console.log('success');
      this.showConfirmation(); // Affiche un message de confirmation si le formulaire est valide
    } else {
      console.log('fail'); // Affiche un échec si la validation échoue
    }
  }

  /**
   * Valide tous les champs requis du formulaire
   * @return {boolean} - État de la validation du formulaire (true si valide)
   */
  validate() {
    console.log('validate');
    let isValid = true;

    // Boucle sur chaque champ et vérifie la validité
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required && !this.validateInput(input)) {
        isValid = false; // Si un champ requis est invalide, isValid devient false
      }
    }

    return isValid; // Renvoie true si tous les champs requis sont valides
  }

  // Valide un champ spécifique
  validateInput(event) {
    const input = event.currentTarget || event; // Récupère l'élément actuel

    if (input.validity.valid) {
      this.removeError(input); // Retire le message d'erreur si l'input est valide
    } else {
      this.addError(input); // Ajoute un message d'erreur si l'input est invalide
    }

    return input.validity.valid; // Retourne true si l'input est valide, false sinon
  }

  // Ajoute une classe d'erreur pour afficher le message d'erreur
  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input'); // Sélectionne le conteneur du champ
    container.classList.add('error'); // Ajoute la classe 'error' pour styliser l'erreur
  }

  // Retire la classe d'erreur pour masquer le message d'erreur
  removeError(input) {
    console.log('yo');
    const container =
      input.closest('[data-input-container]') || input.closest('.input'); // Sélectionne le conteneur du champ
    container.classList.remove('error'); // Retire la classe 'error'
  }

  // Affiche un message de confirmation en ajoutant une classe de style
  showConfirmation() {
    this.element.classList.add('is-sent'); // Ajoute une classe pour styliser l'état "envoyé"
  }
}
