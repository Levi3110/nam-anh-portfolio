const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}

const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.header nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const tiltTargets = document.querySelectorAll(
  '.profile-card, .achievement-card, .project-card, .main-project'
);

tiltTargets.forEach((card) => {
  card.classList.add('tilt-card');

  card.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || window.innerWidth <= 700) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
    card.style.setProperty('--ry', `${(x - 0.5) * 9}deg`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

const planet = document.querySelector('.hero-planet');
let pointerFrame;

window.addEventListener('pointermove', (event) => {
  if (reducedMotion.matches || window.innerWidth <= 700) return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 14;
    planet.style.marginRight = `${x}px`;
    planet.style.marginTop = `${y}px`;
  });
}, { passive: true });
