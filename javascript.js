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

// Funções para os botões de ação na seção de gastronomia
document.addEventListener("DOMContentLoaded", function () {
  // Favoritar
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const isActive = this.classList.contains("active");
      const icon = this.querySelector("i");
      icon.textContent = isActive ? "favorite" : "favorite_border";

      // Feedback visual
      const originalTitle = this.title;
      this.title = isActive ? "Remover dos favoritos" : "Favoritar";
      setTimeout(() => {
        this.title = originalTitle;
      }, 2000);
    });
  });

  // Adicionar ao carrinho
  const cartButtons = document.querySelectorAll(".cart-btn");
  cartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Animação de feedback
      this.style.transform = "scale(1.2)";
      this.style.color = "#4CAF50";
      setTimeout(() => {
        this.style.transform = "";
        this.style.color = "";
      }, 300);

      // Feedback para o usuário
      const originalTitle = this.title;
      this.title = "Adicionado ao carrinho!";
      setTimeout(() => {
        this.title = originalTitle;
      }, 2000);
    });
  });

  // Modal de detalhes
  const detailsButtons = document.querySelectorAll(".details-btn");
  const modal = document.createElement("div");
  modal.className = "modal";
  document.body.appendChild(modal);

  // Dados detalhados para cada item (você pode personalizar conforme necessário)
  const detailedItems = [
    {
      title: "Pintado na Telha",
      image: "https://placehold.co/600x400/8B4513/FFFFFF?text=Pintado+na+Telha",
      description:
        "Tradicional prato cuiabano preparado com peixe da região, temperos locais e servido em telha de barro. O pintado é um peixe de água doce muito apreciado na culinária mato-grossense, conhecido por sua carne branca e saborosa.",
      preparation: "45 minutos",
      price: "R$ 42,00",
      ingredients:
        "Pintado fresco, cebola, alho, tomate, coentro, limão, sal e pimenta do reino.",
    },
    {
      title: "Moqueca Cuiabana",
      image: "https://placehold.co/600x400/D2691E/FFFFFF?text=Moqueca+Cuiabana",
      description:
        "Deliciosa moqueca preparada com peixes de água doce, leite de coco e temperos regionais. Uma variação da tradicional moqueca baiana, adaptada aos ingredientes e sabores do Pantanal.",
      preparation: "50 minutos",
      price: "R$ 38,00",
      ingredients:
        "Peixe de água doce, leite de coco, dendê, cebola, alho, tomate, pimentão, coentro e limão.",
    },
    {
      title: "Bolinho de Arroz com Pequi",
      image:
        "https://placehold.co/600x400/CD853F/FFFFFF?text=Bolinho+de+Arroz+com+Pequi",
      description:
        "Combinação perfeita de arroz com o fruto típico do Cerrado, o pequi, criando um sabor inconfundível. O pequi é um fruto característico do Cerrado brasileiro, com sabor e aroma únicos.",
      preparation: "30 minutos",
      price: "R$ 22,00",
      ingredients:
        "Arroz cozido, pequi, ovos, farinha de trigo, cebola, alho, coentro e sal.",
    },
    {
      title: "Arroz de Carreteiro",
      image:
        "https://placehold.co/600x400/8B4513/FFFFFF?text=Arroz+de+Carreteiro",
      description:
        "Prato tradicional feito com carne seca, linguiça e arroz, representando a culinária dos tropeiros. Era preparado pelos tropeiros que viajavam pelo interior do Brasil transportando gado.",
      preparation: "60 minutos",
      price: "R$ 35,00",
      ingredients:
        "Carne seca dessalgada, linguiça, arroz, cebola, alho, tomate, pimentão e coentro.",
    },
    {
      title: "Guaraná Nativo",
      image: "https://placehold.co/600x400/D2691E/FFFFFF?text=Guaraná+Nativo",
      description:
        "Bebida refrescante feita com o fruto nativo do Cerrado, com sabor único e propriedades energéticas. O guaraná nativo é diferente do refrigerante industrializado, sendo feito artesanalmente com o fruto verdadeiro.",
      preparation: "10 minutos",
      price: "R$ 12,00",
      ingredients: "Frutos de guaraná nativo, água e açúcar mascavo.",
    },
    {
      title: "Cachaça Artisanal",
      image:
        "https://placehold.co/600x400/CD853F/FFFFFF?text=Cachaça+Artisanal",
      description:
        "Destilado tradicional produzido artesanalmente com cana-de-açúcar da região, com sabores únicos. Produzida por pequenos produtores locais seguindo métodos tradicionais de fabricação.",
      preparation: "Envelhecimento: 2 anos",
      price: "R$ 85,00",
      ingredients:
        "Cana-de-açúcar orgânica, fermentação natural e destilação em alambique de cobre.",
    },
  ];

  detailsButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const item = detailedItems[index];
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
                            <div class="info-item">
                                <h4>Tempo de Preparo</h4>
                                <p>${item.preparation}</p>
                            </div>
                            <div class="info-item">
                                <h4>Preço</h4>
                                <p>${item.price}</p>
                            </div>
                            <div class="info-item">
                                <h4>Ingredientes</h4>
                                <p>${item.ingredients}</p>
                            </div>
                            <div class="info-item">
                                <h4>Região</h4>
                                <p>Cuiabá - Mato Grosso</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-login favorite-modal-btn">
                            <i class="material-icons">favorite_border</i> Favoritar
                        </button>
                        <button class="btn btn-cadastro cart-modal-btn">
                            <i class="material-icons">shopping_cart</i> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            `;
      modal.style.display = "flex";

      // Fechar modal
      const closeModal = modal.querySelector(".close-modal");
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Fechar modal ao clicar fora
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });

      // Botões no modal
      const favoriteModalBtn = modal.querySelector(".favorite-modal-btn");
      const cartModalBtn = modal.querySelector(".cart-modal-btn");

      favoriteModalBtn.addEventListener("click", () => {
        favoriteModalBtn.innerHTML =
          '<i class="material-icons">favorite</i> Favoritado!';
        favoriteModalBtn.style.backgroundColor = "#ff6b6b";
        favoriteModalBtn.style.color = "#fff";
        setTimeout(() => {
          favoriteModalBtn.innerHTML =
            '<i class="material-icons">favorite_border</i> Favoritar';
          favoriteModalBtn.style.backgroundColor = "";
          favoriteModalBtn.style.color = "";
        }, 2000);
      });

      cartModalBtn.addEventListener("click", () => {
        cartModalBtn.innerHTML =
          '<i class="material-icons">check</i> Adicionado!';
        cartModalBtn.style.backgroundColor = "#4CAF50";
        setTimeout(() => {
          cartModalBtn.innerHTML =
            '<i class="material-icons">shopping_cart</i> Adicionar ao Carrinho';
          cartModalBtn.style.backgroundColor = "";
        }, 2000);
      });
    });
  });
});
