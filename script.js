const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const backTop = document.getElementById('backTop');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
});
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name')?.trim();
  formMessage.textContent = `تم استلام طلبك${name ? ` يا ${name}` : ''}، وسيتواصل معك فريقنا لتأكيد الموعد.`;
  formMessage.style.color = '#0ca27d';
  bookingForm.reset();
});

const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  contactMessage.textContent = 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت.';
  contactMessage.style.color = '#0ca27d';
  contactForm.reset();
});

const today = new Date().toISOString().split('T')[0];
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  dateInput.min = today;
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));
