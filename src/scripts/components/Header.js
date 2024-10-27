export default class Header {
  constructor(element) {
    this.element = element; // Élément de l'en-tête passé en paramètre
    this.options = {
      threshold: 0.2, // Seuil par défaut pour appliquer des styles après le scroll
      autoHide: false, // Option pour masquer automatiquement l'en-tête au scroll
    };
    this.scrollPosition = 0; // Position de défilement actuelle
    this.lastScrollPosition = 0; // Dernière position de défilement connue
    this.html = document.documentElement; // Élément <html> pour gérer les classes globales
    this.init(); // Initialisation des paramètres d'écoute du défilement
    this.initNavMobile(); // Initialisation de la navigation mobile
  }

  // Initialise les options et l'événement de défilement
  init() {
    this.setOptions(); // Configure les options selon les attributs de données
    window.addEventListener('scroll', this.onScroll.bind(this)); // Ajoute un écouteur de défilement
  }

  // Configure les options en fonction des attributs de données de l'élément
  setOptions() {
    if ('threshold' in this.element.dataset) {
      this.options.threshold = parseFloat(this.element.dataset.threshold); // Définit le seuil de scroll si spécifié
    }

    if ('autoHide' in this.element.dataset) {
      this.options.autoHide = true; // Active l'auto-masquage si 'data-auto-hide' est présent
    }
  }

  // Gère les actions à chaque défilement
  onScroll() {
    this.lastScrollPosition = this.scrollPosition; // Sauvegarde la dernière position de défilement
    this.scrollPosition = document.scrollingElement.scrollTop; // Met à jour la position de défilement actuelle
    this.setHeaderState(); // Définit l'état d'affichage de l'en-tête
    this.setDirections(); // Définit la direction du défilement
  }

  // Détermine l'état d'affichage de l'en-tête en fonction du seuil de scroll
  setHeaderState() {
    if (
      this.scrollPosition >
      document.scrollingElement.scrollHeight * this.options.threshold
    ) {
      this.html.classList.add('header-is-hidden'); // Masque l'en-tête si le seuil est dépassé
      if (this.options.autoHide == true) {
        console.log('allo');
        this.html.classList.remove('header-is-hidden'); // Affiche l'en-tête si autoHide est activé
      }
    } else {
      this.html.classList.remove('header-is-hidden'); // Affiche l'en-tête si le seuil n'est pas atteint
    }
  }

  // Définit les directions de défilement (haut ou bas)
  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      // Si on défile vers le bas
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      // Si on défile vers le haut
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  // Initialise la navigation mobile en ajoutant un écouteur de clic
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle'); // Bouton de bascule pour la navigation mobile
    toggle.addEventListener('click', this.onToggleNav.bind(this)); // Gère le clic pour activer/désactiver la navigation
  }

  // Active/désactive la classe pour l'affichage de la navigation mobile
  onToggleNav(evt) {
    this.html.classList.toggle('nav-is-active'); // Bascule l'état de la navigation mobile
  }
}
