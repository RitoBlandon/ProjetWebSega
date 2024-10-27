export default class Youtube {
  constructor(element) {
    this.element = element; // Élément parent contenant la vidéo YouTube
    this.videoContainer = this.element.querySelector('.js-youtube'); // Conteneur de la vidéo YouTube
    this.poster = this.element.querySelector('.js-poster'); // Élément d'affiche, si présent
    this.videoId = this.element.dataset.videoId; // ID de la vidéo YouTube extrait des attributs de données
    this.autoplay = this.poster ? 1 : 0; // Active l'autoplay uniquement s'il n'y a pas d'affiche
    this.playerReady = false; // Indique si le lecteur est prêt
    this.options = {
      noControls: 1, // Masque les contrôles de la vidéo par défaut
      rel: 1, // Affiche les vidéos recommandées par défaut
    };

    Youtube.instances.push(this); // Ajoute cette instance à la liste des instances de Youtube

    if (this.videoId) {
      Youtube.loadScript(); // Charge le script YouTube si l'ID de la vidéo est présent
    } else {
      console.log('Vous devez spécifier un id'); // Message d'erreur si l'ID de la vidéo n'est pas défini
    }
  }

  // Charge le script YouTube si ce n'est pas déjà fait
  static loadScript() {
    if (!Youtube.scriptIsLoading) {
      Youtube.scriptIsLoading = true; // Empêche le rechargement multiple du script
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api'; // URL de l'API YouTube iframe
      document.body.appendChild(script); // Ajoute le script au corps du document
    }
  }

  // Initialise les options et prépare le lecteur
  init() {
    this.setOptions(); // Configure les options en fonction des attributs de données
    this.initPlayer = this.initPlayer.bind(this); // Lier initPlayer à l'instance actuelle
    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer.bind(this)); // Démarre la vidéo au clic si une affiche est présente
    } else {
      this.initPlayer(); // Démarre la vidéo immédiatement s'il n'y a pas d'affiche
    }
  }

  // Définit les options en fonction des attributs de données
  setOptions() {
    if ('noControls' in this.element.dataset) {
      this.options.noControls = 0; // Affiche les contrôles si 'data-no-controls' est défini
    }
    if ('rel' in this.element.dataset) {
      this.options.rel = 0; // Cache les vidéos recommandées si 'data-rel' est défini
    }
  }

  // Initialise le lecteur YouTube avec les paramètres définis
  initPlayer(event) {
    if (event) {
      this.element.removeEventListener('click', this.initPlayer); // Supprime l'écouteur de clic une fois la vidéo démarrée
    }

    this.player = new YT.Player(this.videoContainer, {
      height: '100%', // Hauteur du lecteur
      width: '100%', // Largeur du lecteur
      videoId: this.videoId, // ID de la vidéo à charger
      playerVars: {
        rel: this.options.rel, // Contrôle l'affichage des vidéos recommandées
        controls: this.options.noControls, // Contrôle l'affichage des contrôles
        autoplay: this.autoplay, // Contrôle l'autoplay en fonction de la présence d'une affiche
      },
      events: {
        onReady: () => {
          this.playerReady = true; // Marque le lecteur comme prêt

          // Ajoute un observateur d'intersection pour suspendre la vidéo lorsque l'élément sort de l'écran
          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (event) => {
          if (event.data == YT.PlayerState.PLAYING) {
            Youtube.pauseAll(this); // Met en pause toutes les autres instances en cours de lecture
          } else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0); // Ramène la vidéo au début une fois terminée
            this.player.pauseVideo(); // Met en pause la vidéo
          }
        },
      },
    });
  }

  // Suspends la vidéo si l'élément sort de l'écran
  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  // Initialise toutes les instances de lecteur YouTube sur la page
  static initAll() {
    document.documentElement.classList.add('is-video-ready'); // Ajoute une classe indiquant que les vidéos sont prêtes
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      instance.init(); // Initialise chaque instance
    }
  }

  // Met en pause toutes les autres vidéos en cours de lecture
  static pauseAll(currentInstance) {
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo(); // Met en pause toutes les instances sauf celle en cours de lecture
      }
    }
  }
}

Youtube.instances = []; // Tableau contenant toutes les instances de la classe Youtube
window.onYouTubeIframeAPIReady = Youtube.initAll; // Fonction appelée lorsque l'API YouTube iframe est prête
