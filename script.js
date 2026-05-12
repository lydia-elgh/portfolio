// ── Menu hamburger ──
function toggleMenu() { // 1. Déclenche l'ouverture ou la fermeture du menu mobile
  const burger = document.getElementById('burger');// 2. Cible l'icône (les 3 barres)
  const menu = document.getElementById('navMobile');// 3. Cible le panneau du menu
  burger.classList.toggle('open');// 4. Ajoute/enlève la classe 'open' au bouton
  menu.classList.toggle('open');// 5. Ajoute/enlève la classe 'open' au menu
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';// 6. Bloque ou libère le scroll de la page derrière le menu
}

function closeMenu() {// 1. Force la fermeture complète du menu mobile
  document.getElementById('burger').classList.remove('open');// 2. Retire le "X"
  document.getElementById('navMobile').classList.remove('open');// 3. Cache le menu
  document.body.style.overflow = '';// 4. Réactive le scroll de la page
}

// ── Modale Projets ──
function openProject(key) {// 1. On récupère les données du projet (titre, tag, desc) dans ton dictionnaire 'projects'
  const p = projects[key]; // Va chercher dans data.js l'objet correspondant à la clé du projet cliqué
  document.getElementById('modalTag').textContent = p.tag;// 2. On injecte le "Tag" (ex: Go, SQL) dans l'élément HTML qui a l'ID 'modalTag'
  document.getElementById('modalTitle').textContent = p.title;// 3. On injecte le "Titre" du projet dans l'élément HTML qui a l'ID 'modalTitle'
  document.getElementById('modalDesc').textContent = p.desc;// 4. On injecte la "Description" détaillée dans l'élément HTML qui a l'ID 'modalDesc'
  document.getElementById('projectOverlay').classList.add('open');// 5. On ajoute la classe 'open' à l'overlay (le fond noir transparent) pour le faire apparaître
  document.body.style.overflow = 'hidden';// 6. On bloque le scroll de la page web pour ne pas que le site bouge derrière la fenêtre
}

function closeProject(e) {
  if (e && e.target !== document.getElementById('projectOverlay')) return;// 1. SÉCURITÉ : Si l'utilisateur clique sur le texte du projet (et pas sur le fond), on ne fait rien
  document.getElementById('projectOverlay').classList.remove('open');// 2. On retire la classe 'open' de l'overlay : la fenêtre disparaît
  document.body.style.overflow = '';// 3. On redonne à la page web la possibilité de défiler (scroll)
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(null); });// On dit au navigateur d'écouter tout ce qu'il se passe sur le clavier, et si l'utilisateur appuie sur la touche "Échap", on ferme la fenêtre de projet (même si elle n'est pas ouverte, ça ne posera pas de problème)

// ── Slider À Propos ──
let currentSlide = 0;// 1. On crée une variable pour savoir sur quelle image on est (0 = la première)
const totalSlides = 2;// 2. On définit le nombre total d'images dans ton slider (ici, il y en a 2)

function goSlide(n) {// 3. Sécurité : on empêche d'aller plus loin que la dernière image ou avant la première
  currentSlide = Math.max(0, Math.min(n, totalSlides - 1));// Math.max et Math.min bloquent le chiffre entre 0 et (total - 1)
  document.getElementById('aproposTrack').style.transform = `translateX(-${currentSlide * 100}%)`;// 4. On fait glisser le "rail" (le conteneur des images) vers la gauche en fonction de l'image sur laquelle on est (0% pour la première, -100% pour la deuxième, etc.)
  document.querySelectorAll('.apropos-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide)); //5. On met à jour les petits points (dots) en dessous pour indiquer quelle image est active : on ajoute la classe 'active' au point qui correspond à l'image actuelle, et on l'enlève des autres
  document.getElementById('apPrev').style.opacity = currentSlide === 0 ? '0.35' : '1';// 6. On change l'apparence du bouton "Précédent" (apPrev) pour le rendre plus clair qu'on ne peut pas cliquer dessus si on est sur la première image (on baisse son opacité à 0.35), et on le remet à 1 (pleinement visible) dès qu'on peut cliquer dessus
  document.getElementById('apNext').style.opacity = currentSlide === totalSlides - 1 ? '0.35' : '1';// 7. Idem pour le bouton "Suivant" (apNext)
}

goSlide(0); // Initialisation 1. On appelle la fonction goSlide(0) pour que le slider "À Propos" s'affiche sur la première image dès que la page est chargée

// ── Animations d'entrée (Sections qui apparaissent) ──
const sections = document.querySelectorAll('section');// 2. On crée une liste de toutes les balises <section> du site. Ces sections correspondent à chaque grande partie de la page (Accueil, À Propos, Compétences, Projets, Expériences). On veut que chacune de ces sections ait une animation d'apparition quand on scroll jusqu'à elles.
const obs = new IntersectionObserver((entries) => {// 3. On crée un "Observateur" (IntersectionObserver). Cet outil permet de surveiller quand un élément (une section) entre dans la zone visible de l'écran (viewport). On lui donne une fonction à exécuter à chaque fois que l'on entre dans une section, et on définit un seuil (threshold) de 0.08, ce qui signifie que la fonction sera déclenchée lorsque 8% de la section sera visible à l'écran.
  entries.forEach(e => {// On regarde chaque section surveillée
    if (e.isIntersecting) {// 4. Si la section devient visible (entre dans le champ de vision)
      e.target.classList.add('visible');// 5. On lui ajoute la classe CSS 'visible' (ce qui déclenche l'animation)
      obs.unobserve(e.target);// 6. Une fois qu'elle est visible, on arrête de la surveiller pour ne pas déclencher l'animation à nouveau si on scroll plus bas puis remonte (ça évite que les sections disparaissent et réapparaissent à chaque fois qu'on scroll)
    }
  });
}, { threshold: 0.08 });// 7. Le seuil (threshold) : l'animation commence quand 8% (0.08) de la section est visible à l'écran

sections.forEach(s => obs.observe(s));// 8. On dit au guetteur (obs) de commencer à surveiller chaque section de la liste.