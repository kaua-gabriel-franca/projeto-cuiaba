// =============== UTILS ===============
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =============== TEMA CLARO/ESCURO ===============
function initThemeToggle() {
  const themeToggles = document.querySelectorAll(
    ".theme-toggle, .theme-toggle-login"
  );
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  function updateIcons() {
    themeToggles.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.textContent = document.body.classList.contains("dark-theme")
          ? "dark_mode"
          : "light_mode";
      }
    });
  }

  updateIcons();

  themeToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateIcons();
    });
  });
}

// =============== FAVORITOS E CARRINHO COM CONTADORES ===============
function initFavoritesAndCart() {
  // Elementos do header (podem não existir em todas as páginas)
  const favoritesCounter = document.getElementById("favoritesCounter");
  const cartCounter = document.getElementById("cartCounter");
  const favHeaderIcon = document.querySelector("#favoritesHeader i");

  // Carrega dados do localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Atualiza contadores no header
  function updateHeaderCounters() {
    if (favoritesCounter) favoritesCounter.textContent = favorites.length;
    if (cartCounter) cartCounter.textContent = cart.length;
    if (favHeaderIcon) {
      favHeaderIcon.textContent =
        favorites.length > 0 ? "favorite" : "favorite_border";
    }
  }

  // Restaura estado visual dos botões na página
  function restoreButtonStates() {
    document.querySelectorAll(".favorite-btn").forEach((btn, index) => {
      const key = `fav_${index}`;
      const isActive = favorites.includes(key);
      btn.classList.toggle("active", isActive);
      const icon = btn.querySelector("i");
      if (icon) {
        icon.textContent = isActive ? "favorite" : "favorite_border";
      }
    });
  }

  // Inicializa
  updateHeaderCounters();
  restoreButtonStates();

  // Favoritos (página principal)
  document.querySelectorAll(".favorite-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const key = `fav_${index}`;
      const isActive = btn.classList.contains("active");

      if (isActive) {
        favorites = favorites.filter((item) => item !== key);
      } else {
        favorites.push(key);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      btn.classList.toggle("active");
      const icon = btn.querySelector("i");
      if (icon) {
        icon.textContent = !isActive ? "favorite" : "favorite_border";
      }

      updateHeaderCounters();
    });
  });

  // Carrinho (página principal)
  document.querySelectorAll(".cart-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const key = `cart_${index}`;
      if (!cart.includes(key)) {
        cart.push(key);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Feedback visual
        btn.style.transform = "scale(1.2)";
        btn.style.color = "#4CAF50";
        const originalTitle = btn.title;
        btn.title = "Adicionado ao carrinho!";
        setTimeout(() => {
          btn.style.transform = "";
          btn.style.color = "";
          btn.title = originalTitle;
        }, 300);

        updateHeaderCounters();
      }
    });
  });

  // Modal: favoritos e carrinho (não persistem no localStorage real, apenas feedback visual)
  document.addEventListener("click", (e) => {
    // Favoritar no modal
    if (e.target.closest(".favorite-modal-btn")) {
      const btn = e.target.closest(".favorite-modal-btn");
      btn.innerHTML = '<i class="material-icons">favorite</i> Favoritado!';
      btn.style.backgroundColor = "#ff6b6b";
      btn.style.color = "#fff";
      setTimeout(() => {
        btn.innerHTML =
          '<i class="material-icons">favorite_border</i> Favoritar';
        btn.style.backgroundColor = "";
        btn.style.color = "";
      }, 2000);
    }

    // Adicionar ao carrinho no modal
    if (e.target.closest(".cart-modal-btn")) {
      const btn = e.target.closest(".cart-modal-btn");
      btn.innerHTML = '<i class="material-icons">check</i> Adicionado!';
      btn.style.backgroundColor = "#4CAF50";
      setTimeout(() => {
        btn.innerHTML = '<i class="material-icons">shopping_cart</i> Adicionar';
        btn.style.backgroundColor = "";
      }, 2000);

      // Opcional: adicionar ao carrinho global (com base no índice do modal)
      const modal = document.querySelector(".modal");
      if (modal) {
        const detailsBtns = document.querySelectorAll(".details-btn");
        let foundIndex = -1;
        detailsBtns.forEach((btn, idx) => {
          if (btn.dataset.clicked === "true") {
            foundIndex = idx;
          }
        });

        if (foundIndex !== -1) {
          const key = `modal_cart_${foundIndex}`;
          if (!cart.includes(key)) {
            cart.push(key);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateHeaderCounters();
          }
        }
      }
    }

    // Marcar qual botão de detalhes foi clicado (para identificar no modal)
    if (e.target.closest(".details-btn")) {
      document
        .querySelectorAll(".details-btn")
        .forEach((b) => delete b.dataset.clicked);
      e.target.closest(".details-btn").dataset.clicked = "true";
    }
  });
}

// =============== VALIDAÇÃO DE FORMULÁRIOS ===============
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    let err = "";
    if (!name) err += "Por favor, preencha o nome.\n";
    if (!email) err += "Por favor, preencha o email.\n";
    else if (!isValidEmail(email)) err += "Email inválido.\n";
    if (!subject) err += "Selecione um assunto.\n";
    if (!message) err += "Escreva uma mensagem.\n";

    if (err) {
      alert(err);
      return;
    }
    alert("Mensagem enviada com sucesso!");
    form.reset();
  });
}

function initSimpleAuthForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    if (!name || !email || !isValidEmail(email)) {
      alert("Preencha nome e email válidos.");
      return;
    }
    alert("Cadastro realizado com sucesso!");
    form.reset();
  });
}

function initAccountForm() {
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
    const gender = document.querySelector('input[name="gender"]:checked');

    let err = "";
    if (!fullName) err += "Nome completo obrigatório.\n";
    if (!contact) err += "Telefone ou email obrigatório.\n";
    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year))
      err += "Data de nascimento inválida.\n";
    else {
      const birthDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      if (birthDate > today || year < 1900 || year > today.getFullYear()) {
        err += "Data de nascimento inválida.\n";
      }
    }
    if (password.length < 6) err += "Senha deve ter 6+ caracteres.\n";
    if (password !== confirmPassword) err += "Senhas não coincidem.\n";
    if (!gender) err += "Selecione seu gênero.\n";

    if (err) {
      alert(err);
      return;
    }
    alert("Conta criada com sucesso!");
    form.reset();
  });
}

// =============== MODAL DE DETALHES ===============
function initModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  document.body.appendChild(modal);

  const items = [
    {
      title: "Pintado na Telha",
      image:
        "https://i.pinimg.com/736x/a8/60/24/a86024c5a45b8430f1193c13b159bd8c.jpg",
      description:
        "Tradicional prato cuiabano preparado com peixe da região, temperos locais e servido em telha de barro.",
      preparation: "45 minutos",
      price: "R$ 42,00",
      ingredients:
        "Pintado fresco, cebola, alho, tomate, coentro, limão, sal e pimenta do reino.",
    },
    {
      title: "Moqueca Cuiabana",
      image:
        "https://i.pinimg.com/736x/f7/95/17/f795174cc2d38a0020dc824064d5bb03.jpg",
      description:
        "Deliciosa moqueca preparada com peixes de água doce, leite de coco e temperos regionais.",
      preparation: "50 minutos",
      price: "R$ 38,00",
      ingredients:
        "Peixe de água doce, leite de coco, dendê, cebola, alho, tomate, pimentão, coentro e limão.",
    },
    {
      title: "Bolinho de Arroz com Pequi",
      image:
        "https://i.pinimg.com/1200x/0a/0f/f4/0a0ff448b1e25e1f430e8073674f6dac.jpg",
      description:
        "Combinação perfeita de arroz com o fruto típico do Cerrado, o pequi, criando um sabor inconfundível.",
      preparation: "30 minutos",
      price: "R$ 22,00",
      ingredients:
        "Arroz cozido, pequi, ovos, farinha de trigo, cebola, alho, coentro e sal.",
    },
    {
      title: "Arroz de Carreteiro",
      image:
        "https://i.pinimg.com/736x/b6/b3/08/b6b308b2373229fa5dfc0228f4183cf0.jpg",
      description:
        "Prato tradicional feito com carne seca, linguiça e arroz, representando a culinária dos tropeiros.",
      preparation: "60 minutos",
      price: "R$ 35,00",
      ingredients:
        "Carne seca dessalgada, linguiça, arroz, cebola, alho, tomate, pimentão e coentro.",
    },
    {
      title: "Guaraná Nativo",
      image:
        "https://i.pinimg.com/736x/7f/58/7a/7f587a7b220d6d27a6afe01474e6e891.jpg",
      description:
        "Bebida refrescante feita com o fruto nativo do Cerrado, com sabor único e propriedades energéticas.",
      preparation: "10 minutos",
      price: "R$ 12,00",
      ingredients: "Frutos de guaraná nativo, água e açúcar mascavo.",
    },
    {
      title: "Cachaça Artesanal",
      image:
        "https://i.pinimg.com/1200x/a7/0e/66/a70e6611e19c001be91edf61ae73b110.jpg",
      description:
        "Destilado tradicional produzido artesanalmente com cana-de-açúcar da região, com sabores únicos.",
      preparation: "Envelhecimento: 2 anos",
      price: "R$ 85,00",
      ingredients:
        "Cana-de-açúcar orgânica, fermentação natural e destilação em alambique de cobre.",
    },
  ];

  document.querySelectorAll(".details-btn").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const item = items[idx];
      if (!item) return;

      modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${item.title}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <img src="${item.image}" alt="${item.title}" class="modal-image">
                        <p class="modal-description">${item.description}</p>
                        <div class="modal-info">
                            <div class="info-item"><h4>Tempo</h4><p>${item.preparation}</p></div>
                            <div class="info-item"><h4>Preço</h4><p>${item.price}</p></div>
                            <div class="info-item"><h4>Ingredientes</h4><p>${item.ingredients}</p></div>
                            <div class="info-item"><h4>Região</h4><p>Cuiabá - MT</p></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-login favorite-modal-btn">
                            <i class="material-icons">favorite_border</i> Favoritar
                        </button>
                        <button class="btn btn-cadastro cart-modal-btn">
                            <i class="material-icons">shopping_cart</i> Adicionar
                        </button>
                    </div>
                </div>
            `;
      modal.style.display = "flex";

      modal
        .querySelector(".close-modal")
        ?.addEventListener("click", () => (modal.style.display = "none"));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    });
  });
}

// =============== SMOOTH SCROLL ===============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });
}

// =============== INICIALIZAÇÃO GERAL ===============
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initFavoritesAndCart(); // ← Inclui favoritos, carrinho e contadores
  initContactForm();
  initSimpleAuthForm();
  initAccountForm();
  initModal();
  initSmoothScroll();
});
