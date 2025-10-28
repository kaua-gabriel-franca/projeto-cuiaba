// js/carrinho.js - Lógica da página do carrinho

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyMessage = document.getElementById("empty-message");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!cartItemsContainer) return; // Só executa se estiver na página do carrinho

  // Lista de produtos (deve ser idêntica à do index.html)
  const products = [
    {
      id: "cart_0",
      name: "Pintado na Telha",
      price: 42.0,
      image:
        "https://i.pinimg.com/736x/a8/60/24/a86024c5a45b8430f1193c13b159bd8c.jpg",
    },
    {
      id: "cart_1",
      name: "Moqueca Cuiabana",
      price: 38.0,
      image:
        "https://i.pinimg.com/736x/f7/95/17/f795174cc2d38a0020dc824064d5bb03.jpg",
    },
    {
      id: "cart_2",
      name: "Bolinho de Arroz com Pequi",
      price: 22.0,
      image:
        "https://i.pinimg.com/1200x/0a/0f/f4/0a0ff448b1e25e1f430e8073674f6dac.jpg",
    },
    {
      id: "cart_3",
      name: "Arroz de Carreteiro",
      price: 35.0,
      image:
        "https://i.pinimg.com/736x/b6/b3/08/b6b308b2373229fa5dfc0228f4183cf0.jpg",
    },
    {
      id: "cart_4",
      name: "Guaraná Nativo",
      price: 12.0,
      image:
        "https://i.pinimg.com/736x/7f/58/7a/7f587a7b220d6d27a6afe01474e6e891.jpg",
    },
    {
      id: "cart_5",
      name: "Cachaça Artesanal",
      price: 85.0,
      image:
        "https://i.pinimg.com/1200x/a7/0e/66/a70e6611e19c001be91edf61ae73b110.jpg",
    },
  ];

  // Carrega carrinho do localStorage
  let cart = JSON.parse(localStorage.getItem("cartWithQty") || "{}");

  function calculateTotal() {
    let total = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const product = products.find((p) => p.id === id);
      if (product) total += product.price * qty;
    }
    return total;
  }

  function renderCart() {
    const cartEntries = Object.entries(cart).filter(([id]) =>
      products.some((p) => p.id === id)
    );
    if (cartEntries.length === 0) {
      emptyMessage.style.display = "block";
      cartItemsContainer.style.display = "none";
      checkoutBtn.disabled = true;
      cartTotalElement.textContent = "R$ 0,00";
      return;
    }

    emptyMessage.style.display = "none";
    cartItemsContainer.style.display = "flex";
    cartItemsContainer.innerHTML = "";

    cartEntries.forEach(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="cart-item-image">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <div class="item-price">R$ ${product.price
                      .toFixed(2)
                      .replace(".", ",")}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${id}">−</button>
                        <span class="quantity-display">${qty}</span>
                        <button class="quantity-btn plus" data-id="${id}">+</button>
                        <button class="remove-btn" data-id="${id}">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(itemEl);
    });

    // Atualiza total
    const total = calculateTotal();
    cartTotalElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    checkoutBtn.disabled = total === 0;
  }

  // Eventos de delegação
  cartItemsContainer.addEventListener("click", (e) => {
    const id = e.target.closest("[data-id]")?.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("minus") || e.target.textContent === "−") {
      if (cart[id] > 1) {
        cart[id]--;
      } else {
        delete cart[id];
      }
      localStorage.setItem("cartWithQty", JSON.stringify(cart));
      renderCart();
      if (typeof updateHeaderCounters === "function") updateHeaderCounters();
    }

    if (e.target.classList.contains("plus") || e.target.textContent === "+") {
      cart[id] = (cart[id] || 0) + 1;
      localStorage.setItem("cartWithQty", JSON.stringify(cart));
      renderCart();
      if (typeof updateHeaderCounters === "function") updateHeaderCounters();
    }

    if (e.target.closest(".remove-btn")) {
      delete cart[id];
      localStorage.setItem("cartWithQty", JSON.stringify(cart));
      renderCart();
      if (typeof updateHeaderCounters === "function") updateHeaderCounters();
    }
  });

  // Botão de comprar
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(
        "Compra realizada com sucesso! 🎉\nObrigado por apoiar a cultura e gastronomia cuiabana."
      );
      localStorage.removeItem("cartWithQty");
      renderCart();
      if (typeof updateHeaderCounters === "function") updateHeaderCounters();
    });
  }

  // Renderiza inicialmente
  renderCart();
});
