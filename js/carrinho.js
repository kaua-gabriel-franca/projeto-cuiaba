// js/carrinho.js

document.addEventListener("DOMContentLoaded", () => {
  // Botões na página principal
  const cartButtons = document.querySelectorAll(".cart-btn");
  cartButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const key = `cart_${index}`;
      let cart = JSON.parse(localStorage.getItem("cartWithQty") || "{}");
      cart[key] = (cart[key] || 0) + 1;
      localStorage.setItem("cartWithQty", JSON.stringify(cart));
      updateHeaderCounters(); // de javascript.js

      // Feedback visual
      btn.style.transform = "scale(1.2)";
      btn.style.color = "#4CAF50";
      setTimeout(() => {
        btn.style.transform = "";
        btn.style.color = "";
      }, 300);
    });
  });

  // Página do carrinho
  if (document.getElementById("cart-items")) {
    renderCartPage();
  }
});

function renderCartPage() {
  // (Mesmo código que enviei para carrinho.html)
}
