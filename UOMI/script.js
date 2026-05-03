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
  const figure = section.querySelector(".anim-figure");
  const letters = section.querySelectorAll(".anim-letter");
  const hint = section.querySelector(".about-anim-hint");
  if (!sticky || !figure || letters.length === 0) return;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /* Cada letra guarda en sus data-* su Y inicial (la parte de la figura de la
     que sale) y su Y final (su posición apilada en UOMI vertical), además del
     delay y duración relativos al progreso global del scroll. */
  const items = Array.from(letters).map((el) => ({
    el,
    fromY: parseFloat(el.dataset.fromY),
    toY: parseFloat(el.dataset.toY),
    delay: parseFloat(el.dataset.delay) || 0,
    duration: parseFloat(el.dataset.duration) || 0.4,
  }));

  function update() {
    const rect = section.getBoundingClientRect();
    const range = Math.max(1, section.offsetHeight - sticky.offsetHeight);
    const scrolled = -rect.top;
    const p = clamp(scrolled / range, 0, 1);

    /* Figura: visible hasta ~0.05, se desvanece rápido (hasta 0.25)
       para no quedar solapada cuando aparezcan las letras. */
    const figProgress = clamp((p - 0.05) / 0.2, 0, 1);
    figure.setAttribute("opacity", String(1 - figProgress));

    items.forEach((item) => {
      const localP = clamp((p - item.delay) / item.duration, 0, 1);
      const eased = easeOutCubic(localP);

      const y = item.fromY + (item.toY - item.fromY) * eased;
      const scale = 0.55 + 0.45 * eased;
      const opacity = clamp(eased * 1.6, 0, 1);

      item.el.setAttribute(
        "transform",
        `translate(150 ${y.toFixed(2)}) scale(${scale.toFixed(3)})`
      );
      /* style.opacity gana sobre la regla CSS inicial (.anim-letter { opacity: 0 }) */
      item.el.style.opacity = opacity.toFixed(3);
    });

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
