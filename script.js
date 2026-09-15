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
