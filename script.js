// ============================================================
// EVANDRA PORTFOLIO — script.js
// Vanilla JavaScript — Modular & Clean
// ============================================================

// ─────────────────────────────────────────────
// 1. DARK MODE TOGGLE
// ─────────────────────────────────────────────
const html = document.documentElement;
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const moonIconM = document.getElementById('moon-icon-m');
const sunIconM = document.getElementById('sun-icon-m');

function applyTheme(theme) {
  if (theme === 'light') {
    html.classList.remove('dark');
    moonIcon.classList.remove('hidden'); sunIcon.classList.add('hidden');
    moonIconM.classList.remove('hidden'); sunIconM.classList.add('hidden');
  } else {
    html.classList.add('dark');
    moonIcon.classList.add('hidden'); sunIcon.classList.remove('hidden');
    moonIconM.classList.add('hidden'); sunIconM.classList.remove('hidden');
  }
  localStorage.setItem('theme', theme);
}

// Load saved preference (default: dark)
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark');
applyTheme(savedTheme);

function toggleTheme() {
  applyTheme(html.classList.contains('dark') ? 'light' : 'dark');
}

document.getElementById('dark-toggle').addEventListener('click', toggleTheme);
document.getElementById('dark-toggle-mobile').addEventListener('click', toggleTheme);


// ─────────────────────────────────────────────
// 2. STICKY NAVBAR — blur + shadow on scroll
// ─────────────────────────────────────────────
const navWrapper = document.getElementById('nav-wrapper');

window.addEventListener('scroll', () => {

  if (window.scrollY > 30) {

    navWrapper.classList.add(
      'bg-white/20',
      'dark:bg-zinc-900/30',
      'backdrop-blur-xl',
      'border',
      'border-white/20',
      'shadow-xl'
    );

  } else {

    navWrapper.classList.remove(
      'bg-white/20',
      'dark:bg-zinc-900/30',
      'backdrop-blur 1xl',
      'border',
      'border-white/10',
      'shadow-xl',
      'shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
    );

  }

}, { passive: true });


// ─────────────────────────────────────────────
// 3. HAMBURGER MENU — mobile nav toggle
// ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  // toggle class on the button wrapper to animate lines into an X
  hamburger.classList.toggle('ham-open', menuOpen);
  // also add aria-expanded for accessibility
  hamburger.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
  mobileMenu.classList.toggle('hidden', !menuOpen);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('ham-open');
    mobileMenu.classList.add('hidden');
  });
});


// ─────────────────────────────────────────────
// 4. SMOOTH SCROLLING — for all anchor links
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const navHeight = header.offsetHeight || 80;
    // Try to scroll to the first heading inside the section for tighter alignment
    const heading = target.querySelector('h1, h2, h3, h4, .section-title');
    const extraOffset = -50; // proper spacing so heading appears right after navbar
    const targetY = (heading ? (heading.getBoundingClientRect().top + window.scrollY) : target.offsetTop) - navHeight + extraOffset;

    window.scrollTo({
      top: Math.max(0, Math.round(targetY)),
      behavior: 'smooth'
    });

    // If mobile menu is open, close it after navigating
    if (!mobileMenu.classList.contains('hidden')) {
      menuOpen = false;
      hamburger.classList.remove('ham-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
    }

    // Update URL hash without jumping
    history.pushState(null, '', href);
  });
});


// ─────────────────────────────────────────────
// 5. TYPING ANIMATION — hero section
// ─────────────────────────────────────────────
const typedEl = document.getElementById('typed-text');
const strings = [
  'Web Developer.',
  'Front-End Designer.',
  'just a student.',
  'karanganyar central of java'
];

let strIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = strings[strIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);   // pause before deleting
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      strIndex = (strIndex + 1) % strings.length;
      setTimeout(typeLoop, 400);    // pause before next word
      return;
    }
    setTimeout(typeLoop, 40);
  }
}

typeLoop();


// ─────────────────────────────────────────────
// 6. SCROLL REVEAL — Intersection Observer
// ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger child cards using their transition-delay
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// ─────────────────────────────────────────────
// 7. PROGRESS BARS — animate when in view
// ─────────────────────────────────────────────
const bars = document.querySelectorAll('.progress-bar');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.width;
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));


// ─────────────────────────────────────────────
// 8. CONTACT FORM — simple submit feedback
// ─────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = '✓ Sent! (connect a backend to receive this)';
    btn.disabled = true;
    btn.classList.add('opacity-70');

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.classList.remove('opacity-70');
      contactForm.reset();
    }, 3000);
  });
}


// ─────────────────────────────────────────────
// 9. ACTIVE NAV LINK — highlight on scroll
// ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('text-indigo-400', isActive);
        link.classList.toggle('text-zinc-400', !isActive);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
