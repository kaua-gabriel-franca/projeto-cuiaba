// =============== UTILS GLOBAIS ===============
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =============== TEMA CLARO/ESCURO ===============
function initThemeToggle() {
  const themeToggles = document.querySelectorAll(
    ".theme-toggle, .theme-toggle-login"
  );
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  function updateIcons() {
    themeToggles.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.textContent = document.body.classList.contains("dark-theme")
          ? "dark_mode"
          : "light_mode";
      }
    });
  }

  updateIcons();

  themeToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateIcons();
    });
  });
}

// =============== SMOOTH SCROLL ===============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });
}

// =============== ATUALIZAÇÃO DE CONTADORES NO HEADER ===============
function updateHeaderCounters() {
  // Favoritos
  const favoritesCounter = document.getElementById("favoritesCounter");
  if (favoritesCounter) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favoritesCounter.textContent = favorites.length;

    const favIcon = document.querySelector("#favoritesHeader i");
    if (favIcon) {
      favIcon.textContent =
        favorites.length > 0 ? "favorite" : "favorite_border";
    }
  }

  // Carrinho
  const cartCounter = document.getElementById("cartCounter");
  if (cartCounter) {
    const cartWithQty = JSON.parse(localStorage.getItem("cartWithQty") || "{}");
    const totalItems = Object.values(cartWithQty).reduce(
      (sum, qty) => sum + qty,
      0
    );
    cartCounter.textContent = totalItems;
  }
}

// =============== INICIALIZAÇÃO GLOBAL ===============
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothScroll();
  updateHeaderCounters(); // Atualiza contadores ao carregar qualquer página
});
