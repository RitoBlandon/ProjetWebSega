export default class Scrolly {
  constructor(element) {
    this.element = element; // Élément sur lequel l'effet scrolly sera appliqué
    this.options = {
      rootMargin: '0px', // Marge pour déclencher l'observation autour de l'élément
      repeat: true, // Option pour répéter l'animation si l'élément sort et entre de la vue
    };

    this.init(); // Appelle la méthode d'initialisation
  }

  // Initialise les options et met en place l'observateur d'intersection
  init() {
    this.setOptions(); // Définit les options d'observation

    const observer = new IntersectionObserver(
      this.watch.bind(this), // Lie la fonction de gestion d'intersection
      this.options // Passe les options configurées à l'observateur
    );

    const items = this.element.querySelectorAll('[data-scrolly]'); // Sélectionne tous les éléments à observer
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item); // Observe chaque élément scrolly
    }
  }

  // Configure les options selon les attributs de données de l'élément
  setOptions() {
    if ('noRepeat' in this.element.dataset) {
      this.options.repeat = false; // Désactive la répétition si 'data-no-repeat' est présent
    }
  }

  // Fonction de gestion des changements d'intersection
  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target; // Élément observé

      if (entry.isIntersecting) {
        target.classList.add('is-active'); // Ajoute la classe d'animation si l'élément est dans le viewport
        console.log(this.element.dataset);

        if (!this.options.repeat) {
          observer.unobserve(target); // Arrête d'observer si la répétition est désactivée
        }
      } else {
        target.classList.remove('is-active'); // Retire la classe d'animation si l'élément sort du viewport
      }
    }
  }
}
