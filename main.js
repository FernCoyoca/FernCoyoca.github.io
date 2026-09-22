/* ============================================================
   APRIL FERN COYOCA — Portfolio JS
   Bright Administrative / Industrial Theme
   ============================================================ */
'use strict';

/* ── LOADER ── */
(function () {
  const loader = document.getElementById('loader');
  const pct    = document.querySelector('.loader-pct');
  if (!loader) return;
  let n = 0;
  const iv = setInterval(() => {
    n = Math.min(n + Math.floor(Math.random() * 14) + 5, 100);
    if (pct) pct.textContent = n + '%';
    if (n >= 100) clearInterval(iv);
  }, 80);
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1800);
  });
})();

/* ── NAV SCROLL STATE ── */
const nav = document.querySelector('nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── DATA-SCROLL BUTTONS ── */
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.scroll);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── MOBILE MENU ── */
const hamburger   = document.querySelector('.hamburger');
const mobileMenu  = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose && mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 55);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll(
  '.svc-card, .why-card, .value-card, .award-card, .stat-cell, .timeline-item, .chip, .info-card'
).forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

/* ── SKILL BAR ANIMATION ── */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
        const w = parseFloat(bar.dataset.w || 0.8);
        setTimeout(() => {
          bar.style.transform = `scaleX(${w})`;
          bar.classList.add('animated');
        }, i * 90);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const skillPanel = document.querySelector('.skills-panel');
if (skillPanel) skillObs.observe(skillPanel);

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, suffix) {
  const dur = 1800;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
      });
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const statsStrip = document.querySelector('.stats-strip-inner');
if (statsStrip) counterObs.observe(statsStrip);

/* ── 3D CARD MOUSE TILT (hero) ── */
const heroPhoto = document.querySelector('.hero-photo-frame');
if (heroPhoto) {
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    heroRight.addEventListener('mousemove', (e) => {
      const rect = heroRight.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      heroPhoto.style.transform = `perspective(800px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
      heroPhoto.style.transition = 'transform 0.1s ease';
    });
    heroRight.addEventListener('mouseleave', () => {
      heroPhoto.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      heroPhoto.style.transition = 'transform 0.6s ease';
    });
  }
}

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeObs.observe(s));
