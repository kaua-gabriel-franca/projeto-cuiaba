// js/favoritos.js - Lógica exclusiva da página de favoritos

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se estamos na página de favoritos
  const favoritesList = document.getElementById("favorites-list");
  const emptyMessage = document.getElementById("empty-message");

  if (!favoritesList || !emptyMessage) {
    // Se não estivermos na página de favoritos, sai
    return;
  }

  // Lista completa de produtos (deve ser idêntica à do index.html)
  const products = [
    {
      id: "fav_0",
      title: "Pintado na Telha",
      image:
        "https://i.pinimg.com/736x/a8/60/24/a86024c5a45b8430f1193c13b159bd8c.jpg",
      description:
        "Tradicional prato cuiabano preparado com peixe da região, temperos locais e servido em telha de barro.",
    },
    {
      id: "fav_1",
      title: "Moqueca Cuiabana",
      image:
        "https://i.pinimg.com/736x/f7/95/17/f795174cc2d38a0020dc824064d5bb03.jpg",
      description:
        "Deliciosa moqueca preparada com peixes de água doce, leite de coco e temperos regionais.",
    },
    {
      id: "fav_2",
      title: "Bolinho de Arroz com Pequi",
      image:
        "https://i.pinimg.com/1200x/0a/0f/f4/0a0ff448b1e25e1f430e8073674f6dac.jpg",
      description:
        "Combinação perfeita de arroz com o fruto típico do Cerrado, o pequi, criando um sabor inconfundível.",
    },
    {
      id: "fav_3",
      title: "Arroz de Carreteiro",
      image:
        "https://i.pinimg.com/736x/b6/b3/08/b6b308b2373229fa5dfc0228f4183cf0.jpg",
      description:
        "Prato tradicional feito com carne seca, linguiça e arroz, representando a culinária dos tropeiros.",
    },
    {
      id: "fav_4",
      title: "Guaraná Nativo",
      image:
        "https://i.pinimg.com/736x/7f/58/7a/7f587a7b220d6d27a6afe01474e6e891.jpg",
      description:
        "Bebida refrescante feita com o fruto nativo do Cerrado, com sabor único e propriedades energéticas.",
    },
    {
      id: "fav_5",
      title: "Cachaça Artesanal",
      image:
        "https://i.pinimg.com/1200x/a7/0e/66/a70e6611e19c001be91edf61ae73b110.jpg",
      description:
        "Destilado tradicional produzido artesanalmente com cana-de-açúcar da região, com sabores únicos.",
    },
  ];

  // Carrega favoritos do localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  // Filtra os produtos que estão favoritados
  const favoritedProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  // Exibe mensagem de "vazio" ou renderiza os cards
  if (favoritedProducts.length === 0) {
    emptyMessage.style.display = "block";
    favoritesList.style.display = "none";
  } else {
    emptyMessage.style.display = "none";
    favoritesList.style.display = "grid";

    // Limpa e renderiza os cards
    favoritesList.innerHTML = "";
    favoritedProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "favorite-card";
      card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="favorite-image">
                <div class="favorite-content">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <div class="card-actions">
                        <button class="action-btn add-to-cart" data-id="${product.id}">
                            <i class="material-icons">shopping_cart</i> Carrinho
                        </button>
                        <button class="action-btn remove-favorite" data-id="${product.id}">
                            <i class="material-icons">delete</i> Remover
                        </button>
                    </div>
                </div>
            `;
      favoritesList.appendChild(card);
    });

    // Evento: remover dos favoritos
    document.querySelectorAll(".remove-favorite").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let currentFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        currentFavorites = currentFavorites.filter((favId) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(currentFavorites));

        // Atualiza contador no header (se a função estiver disponível)
        if (typeof updateHeaderCounters === "function") {
          updateHeaderCounters();
        }

        // Atualiza a página de favoritos
        location.reload();
      });
    });

    // Evento: adicionar ao carrinho
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cartKey = btn.dataset.id.replace("fav_", "cart_");
        let cart = JSON.parse(localStorage.getItem("cartWithQty") || "{}");
        cart[cartKey] = (cart[cartKey] || 0) + 1;
        localStorage.setItem("cartWithQty", JSON.stringify(cart));

        // Atualiza contador do carrinho no header
        if (typeof updateHeaderCounters === "function") {
          updateHeaderCounters();
        }

        // Feedback visual
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="material-icons">check</i> Adicionado!';
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "#fff";
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = "";
          btn.style.color = "";
        }, 2000);
      });
    });
  }
});
