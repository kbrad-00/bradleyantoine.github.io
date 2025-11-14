'use strict';

/* =========================================================
   DISABLE PLACEHOLDER LINKS (#) SO THEY DON'T JUMP
========================================================= */
document.querySelectorAll('a[href="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
  });
});

/* =========================================================
   SMOOTH NAV LINK SCROLLING (SAFE)
========================================================= */
document.querySelector('.nav__links')?.addEventListener('click', e => {
  const link = e.target.closest('.nav__link');
  if (!link) return;

  const id = link.getAttribute('href');
  if (!id || !id.startsWith('#')) return;

  e.preventDefault();

  // special case: href="#" or "#top" → scroll to top smoothly
  if (id === '#' || id === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
});

/* =========================================================
   ⭐ FIXED SKILL TABS — WORKING PERFECTLY ⭐
========================================================= */
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Guard so JS doesn't break if the container isn't found
if (tabsContainer) {
  tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Activate new tab
    clicked.classList.add('operations__tab--active');

    // Show matching content
    const content = document.querySelector(
      `.operations__content--${clicked.dataset.tab}`
    );
    if (content) content.classList.add('operations__content--active');
  });
}

/* =========================================================
   NAVBAR SCROLL FADE
========================================================= */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    const alpha = Math.min(0.7, window.scrollY / 400);
    nav.style.background = `rgba(0,0,0,${alpha})`;
  });
}

/* =========================================================
   STICKY NAV
========================================================= */
const header = document.querySelector('.header');
if (nav && header) {
  const navHeight = nav.getBoundingClientRect().height;

  const stickyNav = entries => {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  };

  new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }).observe(header);
}

/* =========================================================
   PARALLAX HEADER IMAGE
========================================================= */
window.addEventListener('scroll', () => {
  const img = document.querySelector('.header__img');
  if (img) img.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});

/* =========================================================
   SECTION FADE-IN
========================================================= */
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, obs) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.style.opacity = 1;
  entry.target.style.transform = 'translateY(0)';
  obs.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.12,
});

allSections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 1s ease, transform 1s ease';
  sectionObserver.observe(section);
});

/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */
const bar = document.createElement('div');
bar.id = 'scroll-bar';
document.body.appendChild(bar);

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  bar.style.width = scrolled + '%';
});

/* =========================================================
   MAGNETIC BUTTON HOVER
========================================================= */
document.querySelectorAll('.mag').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x / 10}px, ${y / 10}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

/* =========================================================
   TEXT GLOW PULSE
========================================================= */
setInterval(() => {
  document.querySelectorAll('h1, h2').forEach(t => {
    t.style.textShadow =
      `0 0 6px rgba(255,115,0,.4),
       0 0 10px rgba(204,0,255,.25)`;
  });
}, 1000);

/* =========================================================
   ⭐⭐⭐ NETFLIX SLIDER — MANUAL ONLY (NO AUTO SCROLL) ⭐⭐⭐
========================================================= */

const track = document.querySelector('.project-row');
const btnLeftNF = document.querySelector('.project-arrow--left');
const btnRightNF = document.querySelector('.project-arrow--right');

if (track && btnLeftNF && btnRightNF) {
  const cardWidth = 360; // includes card + gap

  // Manual Scroll Buttons only
  btnRightNF.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
  });

  btnLeftNF.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
  });

  // No auto-scroll, no swipe – nothing moves unless you click arrows
}
