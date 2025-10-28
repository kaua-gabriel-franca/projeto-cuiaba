// js/index.js - Lógica da página inicial (index.html)

document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  const cartButtons = document.querySelectorAll(".cart-btn");

  // =============== FAVORITOS ===============
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favoriteButtons.forEach((btn, index) => {
    const key = `fav_${index}`;
    const isActive = favorites.includes(key);
    btn.classList.toggle("active", isActive);
    const icon = btn.querySelector("i");
    if (icon) icon.textContent = isActive ? "favorite" : "favorite_border";

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const nowActive = btn.classList.contains("active");
      if (nowActive) {
        if (!favorites.includes(key)) favorites.push(key);
      } else {
        const i = favorites.indexOf(key);
        if (i > -1) favorites.splice(i, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateHeaderCounters();
    });
  });

  // =============== CARRINHO ===============
  cartButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const key = `cart_${index}`;
      let cart = JSON.parse(localStorage.getItem("cartWithQty") || "{}");
      cart[key] = (cart[key] || 0) + 1;
      localStorage.setItem("cartWithQty", JSON.stringify(cart));

      // Feedback visual
      btn.style.transform = "scale(1.2)";
      btn.style.color = "#4CAF50";
      const original = btn.title;
      btn.title = "Adicionado ao carrinho!";
      setTimeout(() => {
        btn.style.transform = "";
        btn.style.color = "";
        btn.title = original;
      }, 300);

      // Atualiza contador no header
      updateHeaderCounters();
    });
  });
});
