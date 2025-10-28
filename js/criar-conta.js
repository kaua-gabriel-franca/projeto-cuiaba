// js/criar-conta.js - Cadastro com persistência local

// Função para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar telefone (formato: (65) 99999-8888)
function isValidPhone(phone) {
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accountForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obter valores
    const fullName = document.getElementById("fullName").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;

    // Validações
    let error = "";
    if (!fullName) error += "Nome completo é obrigatório.\n";
    if (!contact) error += "Telefone ou email é obrigatório.\n";
    else {
      const isEmail = isValidEmail(contact);
      const isPhone = isValidPhone(contact);
      if (!isEmail && !isPhone) {
        error +=
          "Insira um email válido ou um telefone no formato (65) 99999-8888.\n";
      }
    }

    if (!day || !month || !year) {
      error += "Data de nascimento inválida.\n";
    } else {
      const birthDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      if (birthDate > today || year < 1900 || year > today.getFullYear()) {
        error += "Data de nascimento inválida.\n";
      }
    }

    if (password.length < 6)
      error += "A senha deve ter pelo menos 6 caracteres.\n";
    if (password !== confirmPassword) error += "As senhas não coincidem.\n";
    if (!gender) error += "Selecione seu gênero.\n";

    if (error) {
      alert(error);
      return;
    }

    // ✅ Salvar usuário no localStorage
    const newUser = {
      fullName,
      contact,
      birthDate: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      password,
      gender,
      createdAt: new Date().toISOString(),
    };

    // Verificar duplicidade
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u) => u.contact === contact);
    if (exists) {
      alert("Este email ou telefone já está cadastrado.");
      return;
    }

    // Salvar
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Redirecionar para login
    alert("Conta criada com sucesso! Bem-vindo ao Cuiabá Sabor & Cultura.");
    window.location.href = "login.html";
  });

  // Inicializar tema (já está em javascript.js, mas garantimos compatibilidade)
  const themeToggles = document.querySelectorAll(".theme-toggle-login");
  themeToggles.forEach((btn) => {
    const icon = btn.querySelector("i");
    if (icon) {
      icon.textContent = document.body.classList.contains("dark-theme")
        ? "dark_mode"
        : "light_mode";
    }
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      icon.textContent = document.body.classList.contains("dark-theme")
        ? "dark_mode"
        : "light_mode";
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  });
});
