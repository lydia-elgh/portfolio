// ── Menu hamburger ──
function toggleMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('navMobile');
  burger.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('burger').classList.remove('open');
  document.getElementById('navMobile').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Modale Projets ──
function openProject(key) {
  const p = projects[key]; // Va chercher dans data.js
  document.getElementById('modalTag').textContent = p.tag;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('projectOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject(e) {
  if (e && e.target !== document.getElementById('projectOverlay')) return;
  document.getElementById('projectOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(null); });

// ── Slider À Propos ──
let currentSlide = 0;
const totalSlides = 2;

function goSlide(n) {
  currentSlide = Math.max(0, Math.min(n, totalSlides - 1));
  document.getElementById('aproposTrack').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.apropos-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  document.getElementById('apPrev').style.opacity = currentSlide === 0 ? '0.35' : '1';
  document.getElementById('apNext').style.opacity = currentSlide === totalSlides - 1 ? '0.35' : '1';
}

goSlide(0); // Initialisation

// ── Animations d'entrée (Sections qui apparaissent) ──
const sections = document.querySelectorAll('section');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => obs.observe(s));