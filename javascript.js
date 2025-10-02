// javascript.js
// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");

// Check for saved theme preference or default to light
const currentTheme = document.body.classList.contains("dark-theme")
  ? "dark"
  : "light";

// Set initial icon
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  updateThemeIcon(isDark ? "dark" : "light");
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    icon.textContent = "dark_mode";
  } else {
    icon.textContent = "light_mode";
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    // Basic validation
    let isValid = true;
    let errorMessage = "";

    if (name === "") {
      isValid = false;
      errorMessage += "Por favor, preencha o nome.\n";
    }

    if (email === "") {
      isValid = false;
      errorMessage += "Por favor, preencha o email.\n";
    } else if (!isValidEmail(email)) {
      isValid = false;
      errorMessage += "Por favor, insira um email válido.\n";
    }

    if (subject === "") {
      isValid = false;
      errorMessage += "Por favor, selecione um assunto.\n";
    }

    if (message === "") {
      isValid = false;
      errorMessage += "Por favor, escreva uma mensagem.\n";
    }

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    // If valid, show success message (in a real app, you would send to server)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    contactForm.reset();
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
