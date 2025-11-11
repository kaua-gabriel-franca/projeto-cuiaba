// js/criar-conta.js
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(phone.replace(/\s/g, ""));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accountForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

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
          "Insira um email válido ou telefone no formato (65) 99999-8888.\n";
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

    // ✅ Separa email e phone
    let email = null;
    let phone = null;
    if (isValidEmail(contact)) {
      email = contact;
    } else if (isValidPhone(contact)) {
      phone = contact;
    } else {
      alert("Contato inválido.");
      return;
    }

    const newUser = {
      fullName,
      email,
      phone,
      birthDate: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      password,
      gender,
      createdAt: new Date().toISOString(),
    };

    try {
      registerUser(newUser);
      alert("Conta criada com sucesso!");
      window.location.href = "login.html"; // ✅ Redireciona para login
    } catch (err) {
      alert(err.message);
    }
  });
});
