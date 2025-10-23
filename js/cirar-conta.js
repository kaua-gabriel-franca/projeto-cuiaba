// js/criar-conta.js

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

    let error = "";
    if (!fullName) error += "Nome completo é obrigatório.\n";
    if (!contact) error += "Telefone ou email é obrigatório.\n";
    if (!day || !month || !year || new Date(year, month - 1, day) > new Date())
      error += "Data de nascimento inválida.\n";
    if (password.length < 6)
      error += "Senha deve ter pelo menos 6 caracteres.\n";
    if (password !== confirmPassword) error += "Senhas não coincidem.\n";
    if (!gender) error += "Selecione seu gênero.\n";

    if (error) {
      alert(error);
      return;
    }

    // Tenta registrar
    try {
      const userData = {
        fullName,
        email: contact.includes("@") ? contact : null,
        phone: contact.includes("@") ? null : contact,
        birthDate: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
        password,
        gender,
        createdAt: new Date().toISOString(),
      };
      registerUser(userData);
      alert("Conta criada com sucesso!");
      window.location.href = "login.html"; // ✅ Redireciona para login
    } catch (err) {
      alert(err.message);
    }
  });
});
