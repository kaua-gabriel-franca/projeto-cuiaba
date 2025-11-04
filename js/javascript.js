// js/javascript.js
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothScroll();
  updateHeaderCounters();
  initProfileDropdown();
});

// TEMA
function initThemeToggle() {
  const toggles = document.querySelectorAll(
    ".theme-toggle, .theme-toggle-login"
  );
  const saved = localStorage.getItem("theme") || "light";
  if (saved === "dark") document.body.classList.add("dark-theme");

  toggles.forEach((btn) => {
    const icon = btn.querySelector("i");
    if (icon)
      icon.textContent = document.body.classList.contains("dark-theme")
        ? "dark_mode"
        : "light_mode";
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (icon) icon.textContent = isDark ? "dark_mode" : "light_mode";
    });
  });
}

// SMOOTH SCROLL
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target)
        window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
    });
  });
}

// CONTADORES
function updateHeaderCounters() {
  const favCounter = document.getElementById("favoritesCounter");
  if (favCounter) {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    favCounter.textContent = favs.length;
    const icon = document.querySelector("#favoritesHeader i");
    if (icon)
      icon.textContent = favs.length > 0 ? "favorite" : "favorite_border";
  }

  const cartCounter = document.getElementById("cartCounter");
  if (cartCounter) {
    const cart = JSON.parse(localStorage.getItem("cartWithQty") || "{}");
    const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    cartCounter.textContent = total;
  }
}

// PERFIL DROPDOWN
function initProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  if (!dropdown) return;

  const user = JSON.parse(localStorage.getItem("activeUser") || "null");
  if (user) {
    dropdown.style.display = "block";
    document.querySelector(".auth-buttons").style.display = "none";

    document.getElementById("profileName").textContent =
      user.fullName || "Meu Perfil";

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      logout();
      window.location.reload();
    });

    document.getElementById("viewProfileBtn")?.addEventListener("click", () => {
      const birth = new Date(user.birthDate);
      const formatted = `${birth.getDate().toString().padStart(2, "0")}/${(
        birth.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${birth.getFullYear()}`;
      alert(
        `
📋 Dados do Perfil:
Nome: ${user.fullName}
Contato: ${user.contact}
Data de Nascimento: ${formatted}
Gênero: ${user.gender}
            `.trim()
      );
    });

    document.getElementById("changePhotoBtn")?.addEventListener("click", () => {
      alert("Funcionalidade de troca de foto não disponível no modo offline.");
    });
  } else {
    dropdown.style.display = "none";
  }
}
