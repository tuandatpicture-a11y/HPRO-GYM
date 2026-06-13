const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const form = document.querySelector('#lead-form');

function closeMenu() {
  document.body.classList.remove('menu-open');
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('open');
  document.body.classList.toggle('menu-open', open);
  mobileNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.classList.add('submitted');
  const button = form.querySelector('button');
  button.innerHTML = 'Đã gửi thông tin <span>✓</span>';
  button.disabled = true;
});
