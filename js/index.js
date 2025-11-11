// js/index.js - Interação da página inicial (favoritos, carrinho, modal)

document.addEventListener("DOMContentLoaded", () => {
  // === MODAL DE DETALHES ===
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

  document.querySelectorAll(".details-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const item = items[index];
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

      // Fechar
      modal
        .querySelector(".close-modal")
        ?.addEventListener("click", () => (modal.style.display = "none"));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });

      // Favoritar no modal
      modal
        .querySelector(".favorite-modal-btn")
        ?.addEventListener("click", function () {
          this.innerHTML = '<i class="material-icons">favorite</i> Favoritado!';
          this.style.backgroundColor = "#ff6b6b";
          this.style.color = "#fff";
          setTimeout(() => {
            this.innerHTML =
              '<i class="material-icons">favorite_border</i> Favoritar';
            this.style.backgroundColor = "";
            this.style.color = "";
          }, 2000);
        });

      // Carrinho no modal
      modal
        .querySelector(".cart-modal-btn")
        ?.addEventListener("click", function () {
          this.innerHTML = '<i class="material-icons">check</i> Adicionado!';
          this.style.backgroundColor = "#4CAF50";
          setTimeout(() => {
            this.innerHTML =
              '<i class="material-icons">shopping_cart</i> Adicionar';
            this.style.backgroundColor = "";
          }, 2000);
        });
    });
  });

  // === FAVORITOS E CARRINHO ===
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  const cartButtons = document.querySelectorAll(".cart-btn");

  favoriteButtons.forEach((btn, i) => {
    const isActive = favorites.includes(`fav_${i}`);
    btn.classList.toggle("active", isActive);
    const icon = btn.querySelector("i");
    if (icon) icon.textContent = isActive ? "favorite" : "favorite_border";

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const nowActive = btn.classList.contains("active");
      if (nowActive) {
        favorites.push(`fav_${i}`);
      } else {
        favorites.splice(favorites.indexOf(`fav_${i}`), 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      if (icon) icon.textContent = nowActive ? "favorite" : "favorite_border";
      if (typeof updateHeaderCounters === "function") updateHeaderCounters();
    });
  });

  cartButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cartWithQty") || "{}");
      const key = `cart_${i}`;
      cart[key] = (cart[key] || 0) + 1;
      localStorage.setItem("cartWithQty", JSON.stringify(cart));
      if (typeof updateHeaderCounters === "function") updateHeaderCounters();
    });
  });
});
