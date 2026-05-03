const cartCountEl = document.getElementById("cartCount");
const yearEl = document.getElementById("year");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cartCount = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!cartCountEl) {
      return;
    }

    cartCount += 1;
    cartCountEl.textContent = String(cartCount);

    const originalText = button.textContent;
    button.textContent = "Added!";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 700);
  });
});

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
