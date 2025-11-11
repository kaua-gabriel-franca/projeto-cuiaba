// js/perfil.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("activeUser") || "{}");

  if (!user.fullName) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "login.html";
    return;
  }

  // Preenche dados
  document.getElementById("profileFullName").textContent = user.fullName;
  document.getElementById("profileEmail").textContent = user.email || "—";
  document.getElementById("profilePhone").textContent = user.phone || "—";

  if (user.birthDate) {
    const date = new Date(user.birthDate);
    document.getElementById("profileBirthDate").textContent = `${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  }

  document.getElementById("profileGender").textContent =
    user.gender === "masculino"
      ? "Masculino"
      : user.gender === "feminino"
      ? "Feminino"
      : "Outros";

  if (user.createdAt) {
    const created = new Date(user.createdAt);
    document.getElementById("profileCreatedAt").textContent =
      created.toLocaleDateString("pt-BR");
  }

  // Trocar foto (simulado)
  document.getElementById("changePhotoBtn")?.addEventListener("click", () => {
    alert("Funcionalidade de troca de foto não disponível no modo offline.");
  });

  // Editar perfil (simulado)
  document.getElementById("editProfileBtn")?.addEventListener("click", () => {
    alert("Edição de perfil está em desenvolvimento.");
  });

  // Logout
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("activeUser");
    alert("Você saiu da sua conta.");
    window.location.href = "login.html";
  });

  // Tema toggle
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    const isDark = document.body.classList.contains("dark-theme");
    icon.textContent = isDark ? "dark_mode" : "light_mode";
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      icon.textContent = document.body.classList.contains("dark-theme")
        ? "dark_mode"
        : "light_mode";
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }
});
