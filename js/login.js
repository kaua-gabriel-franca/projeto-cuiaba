// js/login.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Preencha email e senha.");
      return;
    }

    const user = loginUser(email, password);
    if (user) {
      setActiveUser(user);
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Email ou senha incorretos.");
    }
  });
});
