// js/auth.js
function registerUser(userData) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.some((u) => u.contact === userData.contact);
  if (exists) throw new Error("Este email ou telefone já está cadastrado.");
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

function loginUser(contact, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find((u) => u.contact === contact && u.password === password);
}

function setActiveUser(user) {
  localStorage.setItem("activeUser", JSON.stringify(user));
}

function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser") || "null");
}

function logout() {
  localStorage.removeItem("activeUser");
}
