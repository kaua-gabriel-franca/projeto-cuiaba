// js/redefinir-senha.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resetPasswordForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aceita email OU telefone no campo
    const contact = document.getElementById("email").value.trim(); // sim, id="email", mas aceita phone
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let error = "";
    if (!contact) error += "O email ou telefone é obrigatório.\n";
    if (newPassword.length < 6)
      error += "A nova senha deve ter pelo menos 6 caracteres.\n";
    if (newPassword !== confirmPassword) error += "As senhas não coincidem.\n";

    if (error) {
      alert(error);
      return;
    }

    // ✅ Busca por email OU telefone
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(
      (u) =>
        (u.email && u.email === contact) || (u.phone && u.phone === contact)
    );

    if (userIndex === -1) {
      alert("Email ou telefone não encontrado. Verifique e tente novamente.");
      return;
    }

    // Atualiza senha
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Senha redefinida com sucesso!");
    window.location.href = "login.html";
  });
});
