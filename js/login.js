// js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contact = document.getElementById("contact").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!contact || !password) {
      alert("Preencha email/telefone e senha.");
      return;
    }

    // ✅ Busca por email ou phone (auth.js)
    const user = loginUser(contact, password);
    if (user) {
      setActiveUser(user);
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Email/telefone ou senha incorretos.");
    }
  });
});
