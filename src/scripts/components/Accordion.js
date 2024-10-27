export default class Accordion {
  constructor(element) {
    this.element = element;
    this.accordions = this.element.querySelectorAll('.js-accordion'); // Sélectionne tous les éléments d'accordéon
    this.options = {
      notClosing: false, // Par défaut, les autres accordéons se ferment quand un nouvel accordéon est ouvert
      autoOpen: false, // Par défaut, les accordéons ne s'ouvrent pas automatiquement
    };

    this.html = document.documentElement; // Récupère l'élément <html>
    this.init(); // Appelle la méthode d'initialisation
  }

  // Initialise les options et ajoute des écouteurs d'événements
  init() {
    this.setOptions(); // Configure les options en fonction des attributs de données
    this.autoOpenAccordions = this.element.querySelectorAll('[data-auto-open]'); // Sélectionne les accordéons avec 'data-auto-open'

    // Boucle à travers chaque élément d'accordéon
    for (let i = 0; i < this.accordions.length; i++) {
      const element = this.accordions[i];
      element.addEventListener('click', this.onToggleAccordion.bind(this)); // Ajoute un écouteur de clic à chaque accordéon
      if (element.dataset.autoOpen != undefined) {
        element.classList.add('is-active'); // Si 'data-auto-open' est présent, ouvre l'accordéon par défaut
      }
    }
  }

  // Configure les options en fonction des attributs de données de l'élément parent
  setOptions() {
    if ('notClosing' in this.element.dataset) {
      this.options.notClosing = true; // Active l'option notClosing si 'data-not-closing' est présent
    }
  }

  // Gère l'ouverture/fermeture des accordéons
  onToggleAccordion(event) {
    const accordionCliquer = event.currentTarget; // Récupère l'accordéon cliqué

    // Boucle à travers chaque accordéon pour gérer l'état 'is-active'
    for (let i = 0; i < this.accordions.length; i++) {
      const accordion = this.accordions[i];

      // Vérifie si l'accordéon actuel est celui cliqué
      if (accordionCliquer == accordion) {
        accordion.classList.toggle('is-active'); // Active ou désactive l'accordéon cliqué
      } else if (
        !this.options.notClosing && // Si l'option notClosing est désactivée
        accordion.classList.contains('is-active') && // Si l'accordéon est actuellement actif
        this.autoOpenAccordions.length <= 1 // Vérifie qu'il y a au plus un accordéon avec autoOpen
      ) {
        accordion.classList.remove('is-active'); // Ferme l'accordéon actuellement actif
      }
    }
  }
}
