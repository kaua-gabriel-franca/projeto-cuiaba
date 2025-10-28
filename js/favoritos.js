// js/favoritos.js - Renderiza os favoritos na página favoritos.html

document.addEventListener("DOMContentLoaded", () => {
  const favoritesList = document.getElementById("favorites-list");
  const emptyMessage = document.getElementById("empty-message");

  if (!favoritesList || !emptyMessage) return;

  // Lista de produtos (deve ser idêntica à do index.html)
  const products = [
    {
      id: "fav_0",
      title: "Pintado na Telha",
      image:
        "https://i.pinimg.com/736x/a8/60/24/a86024c5a45b8430f1193c13b159bd8c.jpg",
      description: "Tradicional prato cuiabano...",
    },
    {
      id: "fav_1",
      title: "Moqueca Cuiabana",
      image:
        "https://i.pinimg.com/736x/f7/95/17/f795174cc2d38a0020dc824064d5bb03.jpg",
      description: "Deliciosa moqueca...",
    },
    {
      id: "fav_2",
      title: "Bolinho de Arroz com Pequi",
      image:
        "https://i.pinimg.com/1200x/0a/0f/f4/0a0ff448b1e25e1f430e8073674f6dac.jpg",
      description: "Combinação perfeita...",
    },
    {
      id: "fav_3",
      title: "Arroz de Carreteiro",
      image:
        "https://i.pinimg.com/736x/b6/b3/08/b6b308b2373229fa5dfc0228f4183cf0.jpg",
      description: "Prato tradicional...",
    },
    {
      id: "fav_4",
      title: "Guaraná Nativo",
      image:
        "https://i.pinimg.com/736x/7f/58/7a/7f587a7b220d6d27a6afe01474e6e891.jpg",
      description: "Bebida refrescante...",
    },
    {
      id: "fav_5",
      title: "Cachaça Artesanal",
      image:
        "https://i.pinimg.com/1200x/a7/0e/66/a70e6611e19c001be91edf61ae73b110.jpg",
      description: "Destilado tradicional...",
    },
  ];

  // Carrega favoritos do localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favorited = products.filter((p) => favorites.includes(p.id));

  if (favorited.length === 0) {
    emptyMessage.style.display = "block";
    favoritesList.style.display = "none";
  } else {
    emptyMessage.style.display = "none";
    favoritesList.style.display = "grid";
    favoritesList.innerHTML = "";

    favorited.forEach((item) => {
      const card = document.createElement("div");
      card.className = "favorite-card";
      card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="favorite-image">
                <div class="favorite-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="card-actions">
                        <button class="action-btn add-to-cart" data-id="${item.id}">
                            <i class="material-icons">shopping_cart</i> Carrinho
                        </button>
                        <button class="action-btn remove-favorite" data-id="${item.id}">
                            <i class="material-icons">delete</i> Remover
                        </button>
                    </div>
                </div>
            `;
      favoritesList.appendChild(card);
    });

    // Remove do favoritos
    document.querySelectorAll(".remove-favorite").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let current = JSON.parse(localStorage.getItem("favorites") || "[]");
        current = current.filter((f) => f !== id);
        localStorage.setItem("favorites", JSON.stringify(current));
        // Atualiza contador (se função estiver disponível)
        if (typeof updateHeaderCounters === "function") updateHeaderCounters();
        // Recarrega a página
        location.reload();
      });
    });
  }
});
