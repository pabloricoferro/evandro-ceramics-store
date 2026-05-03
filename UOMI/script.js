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

(function aboutAnimation() {
  const section = document.getElementById("aboutAnim");
  if (!section) return;

  const sticky = section.querySelector(".about-anim-sticky");
  const figure = section.querySelector(".about-anim-figure");
  const text = section.querySelector(".about-anim-text");
  const hint = section.querySelector(".about-anim-hint");
  if (!sticky || !figure || !text) return;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  function update() {
    const rect = section.getBoundingClientRect();
    const range = Math.max(1, section.offsetHeight - sticky.offsetHeight);
    const scrolled = -rect.top;
    const p = clamp(scrolled / range, 0, 1);

    /* Figura: 0.00 - 0.65 va desapareciendo, encogiendo y desenfocando */
    const figProgress = clamp((p - 0.05) / 0.6, 0, 1);
    const figOp = 1 - figProgress;
    const figSc = 1 - figProgress * 0.5;
    const figBlur = figProgress * 16;

    /* Texto UOMI: empieza a aparecer en 0.35 y queda nítido en 0.95 */
    const textProgress = clamp((p - 0.35) / 0.6, 0, 1);
    const textOp = textProgress;
    const textSc = 0.55 + textProgress * 0.45;
    const textBlur = (1 - textProgress) * 22;

    figure.style.setProperty("--fig-op", String(figOp));
    figure.style.setProperty("--fig-sc", String(figSc));
    figure.style.setProperty("--fig-blur", figBlur.toFixed(2) + "px");

    text.style.setProperty("--text-op", String(textOp));
    text.style.setProperty("--text-sc", String(textSc));
    text.style.setProperty("--text-blur", textBlur.toFixed(2) + "px");

    if (hint) {
      hint.style.setProperty("--hint-op", p > 0.04 ? "0" : "1");
    }
  }

  let rafId = null;
  function onScroll() {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      update();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
