// ================= THEME TOGGLE =================
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// ================= MOBILE NAV TOGGLE =================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("show");
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
