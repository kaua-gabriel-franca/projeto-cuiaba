// js/auth.js
// Funções de autenticação compartilhadas

// Registra novo usuário (com email/phone separados)
function registerUser(userData) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Verifica duplicidade por email OU phone
  const exists = users.some(
    (u) =>
      (u.email && u.email === userData.email) ||
      (u.phone && u.phone === userData.phone)
  );

  if (exists) {
    throw new Error("Este email ou telefone já está cadastrado.");
  }

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
}

// Busca usuário por email OU telefone + senha
function loginUser(contact, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(
    (u) =>
      ((u.email && u.email === contact) || (u.phone && u.phone === contact)) &&
      u.password === password
  );
}

// Salva sessão ativa
function setActiveUser(user) {
  localStorage.setItem("activeUser", JSON.stringify(user));
}

// Obtém usuário logado
function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser") || "null");
}

// Logout
function logout() {
  localStorage.removeItem("activeUser");
}
