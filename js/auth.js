// js/auth.js - Lógica de autenticação (cadastro, login, sessão)

// Salva usuário no localStorage (simulação simples)
function registerUser(userData) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.some((u) => u.email === userData.email);
  if (exists) {
    throw new Error("Email já cadastrado.");
  }
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

// Verifica credenciais
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find((u) => u.email === email && u.password === password);
}

// Salva sessão ativa
function setActiveUser(user) {
  localStorage.setItem("activeUser", JSON.stringify(user));
}

// Obtém usuário logado
function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser") || "null");
}

// Faz logout
function logout() {
  localStorage.removeItem("activeUser");
  window.location.href = "index.html";
}
