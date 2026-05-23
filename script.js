/**
 * Anant Shrey - Portfolio Engine (script.js)
 * Clean, quietly confident vanilla JS that governs theme toggles,
 * mobile navigation overlays, and slow editorial scroll transitions.
 */

// Execute immediately before DOMContentLoaded to prevent Light/Dark flash
(function() {
  const savedTheme = localStorage.getItem("portfolio-warm-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
})();

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================================
  // WARM CONTRAST THEME SWITCHER
  // ==========================================================================
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  function applyTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-warm-theme", theme);
    
    if (themeIcon) {
      if (theme === "light") {
        themeIcon.className = "bx bx-sun";
      } else {
        themeIcon.className = "bx bx-moon";
      }
    }
  }

  // Setup initial active icon matching immediate load theme
  const initialTheme = htmlElement.getAttribute("data-theme") || "dark";
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(targetTheme);
    });
  }

  // ==========================================================================
  // MOBILE NAVIGATION CONTROLLER
  // ==========================================================================
  const menuToggle = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      
      if (menuIcon) {
        menuIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
      }
    });

    // Close menu when clicking navigation items
    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuIcon) {
          menuIcon.className = "bx bx-menu";
        }
      });
    });
  }

  // ==========================================================================
  // GRACEFUL SCROLL ENTRANCE OBSERVER
  // ==========================================================================
  const fadeUpElements = document.querySelectorAll(".fade-up-trigger");
  
  if ("IntersectionObserver" in window) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          animObserver.unobserve(entry.target); // Trigger transition once
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: "0px 0px -60px 0px" // Triggers slightly before entry to avoid popping
    });

    fadeUpElements.forEach(el => animObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver isn't supported
    fadeUpElements.forEach(el => el.classList.add("animated"));
  }

  // ==========================================================================
  // DYNAMIC HEADER SCROLL DEPTH
  // ==========================================================================
  const header = document.querySelector(".header");
  
  function checkHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.03)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", checkHeaderScroll);
  checkHeaderScroll();
});
