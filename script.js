/* ==========================================================================
   ANANT SHREY — EDITORIAL PORTFOLIO INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRevealOnScroll();
  initNavigation();
  initSmoothScroll();
});

/* ── 1. THEME TOGGLE (PERSISTENT LIGHT / DARK MODE) ── */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  let currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
  updateIcon(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', currentTheme);
      updateIcon(currentTheme);
      localStorage.setItem('as-portfolio-theme', currentTheme);
    });
  }

  function updateIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }
  }
}

/* ── 2. REVEAL ANIMATIONS ON SCROLL ── */
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ── 3. NAVIGATION & MOBILE OVERLAY ── */
function initNavigation() {
  const navBar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }

    highlightActiveSection();
  }, { passive: true });

  // Highlight active section link
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile Overlay Toggle
  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.contains('open');

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function openMobileMenu() {
    mobileOverlay.classList.add('open');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileOverlay.classList.remove('open');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ── 4. SMOOTH SCROLLING ── */
function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
}