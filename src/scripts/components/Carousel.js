import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element; // Élément du carrousel passé en paramètre
    this.options = {
      slidesPerView: 1, // Nombre de diapositives visibles par défaut
      pagination: {}, // Objet de pagination vide pour activer la pagination si nécessaire
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'), // Bouton "suivant" du carrousel
        prevEl: this.element.querySelector('.swiper-button-prev'), // Bouton "précédent" du carrousel
      },
    };
    this.init(); // Appelle la méthode d'initialisation
  }

  // Initialise le carrousel et les options spécifiques
  init() {
    this.setOptions(); // Configure les options en fonction des attributs de données
    var swiper = new Swiper(this.element, this.options); // Initialise Swiper avec l'élément et les options configurées
  }

  // Définit les options du carrousel selon les attributs de données de l'élément
  setOptions() {
    if ('split' in this.element.dataset) {
      // Si l'attribut 'data-split' est présent, applique des points de rupture
      this.options.breakpoints = {
        768: { slidesPerView: 3 }, // Affiche 3 diapositives à partir de 768px de largeur
        350: { slidesPerView: 1 }, // Affiche 1 diapositive pour les petites tailles d'écran
      };
    }

    if ('autoplay' in this.element.dataset) {
      // Si 'data-autoplay' est présent, active le défilement automatique
      this.options.autoplay = {
        delay: 5000, // Définit un délai de 5 secondes entre les diapositives
        pauseOnMouseEnter: true, // Arrête le défilement lors du survol de la souris
        disableOnInteraction: true, // Arrête l'autoplay après une interaction de l'utilisateur
      };
    }

    if ('loop' in this.element.dataset) {
      // Si 'data-loop' est présent, active la boucle pour un défilement infini
      this.options.loop = {
        loop: true,
      };
    }

    if ('slides' in this.element.dataset) {
      // Définit le nombre de diapositives à afficher selon 'data-slides' ou utilise la valeur par défaut
      this.options.slidesPerView =
        this.element.dataset.slides || this.options.slidesPerView;
    }
  }
}
