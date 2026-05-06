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
  const hint = section.querySelector(".about-anim-hint");
  if (!sticky) return;

  /* Scroll-linked morph: setInterval + scroll/touch keeps p in sync on Safari
     iOS with Reduce Motion, where rAF/throttled scroll events often break. */
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const $ = (name) => section.querySelector(`[data-part="${name}"]`);
  const elFull = $("body-full");
  const elTop = $("body-top");
  const elBot = $("body-bottom");
  const elHead = $("head");
  const elArmL = $("arm-left");
  const elArmR = $("arm-right");
  const elLegL = $("leg-left");
  const elLegR = $("leg-right");

  const BODY_FULL =
    "M0,25 C5,25 10,34 10,40 C11,50 11,62 11,70 C8,82 4,86 0,86 C-4,86 -8,82 -11,70 C-11,62 -11,50 -10,40 C-10,34 -5,25 0,25 Z";

  /* Same topology: M + 4 cubics (26 floats). Cup morphs into reference U. */
  const BOTTOM_CUP = [
    10, 40, 11, 50, 11, 62, 11, 70, 8, 82, 4, 86, 0, 86, -4, 86, -8, 82, -11,
    70, -11, 62, -11, 50, -10, 40,
  ];
  const BOTTOM_U = [
    -5.5, 7, -6.5, 11, -7.5, 16, -7.5, 21, -7.5, 24, -4, 26.5, 0, 26.5, 4, 26.5,
    7.5, 24, 7.5, 21, 7.5, 16, 6.5, 11, 5.5, 7,
  ];

  /* Torso cap -> M center: one symmetric cubic (parabolic U), split at t=0.5 so
     we still emit two C segments for lerpFlat. Subdivision of
     (-7,55) C (-3,83) (3,83) (7,55) → smooth valley at (0,76), no flat shelf. */
  const TOP_CAP = [-10, 40, -10, 34, -5, 25, 0, 25, 5, 25, 10, 34, 10, 40];
  const TOP_MVAL = [-7, 55, -5, 69, -2.5, 76, 0, 76, 2.5, 76, 5, 69, 7, 55];

  /* Arms: figure -> straight outer legs (diagonal, feet slightly wider than peaks). */
  const ARM_L_0 = [
    [-14, 32],
    [-16, 42],
    [-19, 58],
    [-20, 67],
  ];
  const ARM_L_1 = [
    [-8.8, 84],
    [-8.3, 76],
    [-7.6, 65],
    [-7, 55],
  ];
  const ARM_R_0 = [
    [14, 32],
    [16, 42],
    [19, 58],
    [20, 67],
  ];
  const ARM_R_1 = [
    [8.8, 84],
    [8.3, 76],
    [7.6, 65],
    [7, 55],
  ];

  const LEG_0_L = [
    [-6, 90],
    [-6, 108],
    [-6, 128],
  ];
  const LEG_1 = [
    [0, 88],
    [0, 100],
    [0, 112],
  ];

  /* Match <polyline> limbs: outline ring for head & torso uses this too. */
  const LIMB_STROKE = 3;
  const STROKE_END = 2.35;
  const SLOT_O_CY = 44;
  const SWAP_START = 0.55;
  const SWAP_END = 0.94;

  /* Vertical whitespace between letters at morph end: match U→O gap for O→M and M→I. */
  const U_LETTER_MAX_Y = Math.max(
    ...BOTTOM_U.filter((_, i) => i % 2 === 1)
  );
  const O_RY_END = 10.5;
  const O_LETTER_TOP_Y = SLOT_O_CY - O_RY_END;
  const O_LETTER_BOTTOM_Y = SLOT_O_CY + O_RY_END;
  const LETTER_GAP_Y = O_LETTER_TOP_Y - U_LETTER_MAX_Y;
  const SHIFT_M_FOR_GAP =
    O_LETTER_BOTTOM_Y + LETTER_GAP_Y - TOP_MVAL[1];
  const SHIFT_I_FOR_GAP =
    ARM_L_1[0][1] + SHIFT_M_FOR_GAP + LETTER_GAP_Y - LEG_1[0][1];

  /* Outline silhouette from p≈0.22 until cut; elFull is hidden only once split
     paths are visible (see showSplit), so nothing flashes invisible. */
  const fullKeyframes = [
    { p: 0.0, fillOp: 1, strokeW: 0, opacity: 1 },
    { p: 0.08, fillOp: 1, strokeW: 0, opacity: 1 },
    { p: 0.22, fillOp: 0, strokeW: LIMB_STROKE, opacity: 1 },
    { p: 1.0, fillOp: 0, strokeW: LIMB_STROKE, opacity: 1 },
  ];

  function bracket(kf, p) {
    if (p <= kf[0].p) return [kf[0], kf[0], 0];
    const last = kf[kf.length - 1];
    if (p >= last.p) return [last, last, 1];
    for (let i = 0; i < kf.length - 1; i++) {
      if (p >= kf[i].p && p <= kf[i + 1].p) {
        const t = (p - kf[i].p) / (kf[i + 1].p - kf[i].p);
        return [kf[i], kf[i + 1], t];
      }
    }
    return [kf[0], kf[0], 0];
  }

  function lerpFlat(a, b, t) {
    return a.map((v, i) => lerp(v, b[i], t));
  }

  function dFromCubics(flat) {
    let d = `M${flat[0].toFixed(2)},${flat[1].toFixed(2)}`;
    for (let i = 2; i < flat.length; i += 6) {
      d += ` C${flat[i].toFixed(2)},${flat[i + 1].toFixed(2)} ${flat[i + 2].toFixed(2)},${flat[i + 3].toFixed(2)} ${flat[i + 4].toFixed(2)},${flat[i + 5].toFixed(2)}`;
    }
    return d;
  }

  function lerpPts(a, b, t) {
    return a.map((p, i) => [lerp(p[0], b[i][0], t), lerp(p[1], b[i][1], t)]);
  }

  function ptsToAttr(pts) {
    return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  }

  const debugP = parseFloat(
    new URLSearchParams(window.location.search).get("p")
  );
  const hasDebugP = !isNaN(debugP);

  function update() {
    const rect = section.getBoundingClientRect();
    let range = section.offsetHeight - sticky.offsetHeight;
    if (!Number.isFinite(range) || range < 1) {
      const sh =
        sticky.offsetHeight || sticky.getBoundingClientRect().height || 0;
      const bh =
        section.offsetHeight || section.getBoundingClientRect().height || 0;
      range = Math.max(1, bh - sh);
    }
    const scrolled = -rect.top;
    const p = hasDebugP ? clamp(debugP, 0, 1) : clamp(scrolled / range, 0, 1);

    /* Phases before / after cut (used by body-full hide vs split show) */
    const showSplit = p >= 0.36;

    /* body-full */
    if (elFull) {
      elFull.setAttribute("d", BODY_FULL);
      let fillOp, strokeW, opacity;
      if (showSplit) {
        fillOp = 0;
        strokeW = 0;
        opacity = 0;
      } else {
        const [a, b, t] = bracket(fullKeyframes, p);
        const e = easeInOutCubic(t);
        fillOp = lerp(a.fillOp, b.fillOp, e);
        strokeW = lerp(a.strokeW, b.strokeW, e);
        opacity = lerp(a.opacity, b.opacity, e);
      }
      elFull.setAttribute("fill-opacity", fillOp.toFixed(3));
      elFull.setAttribute("stroke-width", strokeW.toFixed(2));
      elFull.setAttribute("opacity", opacity.toFixed(3));
    }
    const morphT = easeInOutCubic(clamp((p - 0.55) / (0.94 - 0.55), 0, 1));

    const swapPhase = clamp((p - SWAP_START) / (SWAP_END - SWAP_START), 0, 1);
    const arcX = Math.sin(swapPhase * Math.PI) * 22;

    /* head: deflate then blend into vertical oval O */
    if (elHead) {
      let cy,
        rx,
        ry,
        fillOp,
        strokeW,
        cx = 0;
      if (p < 0.22) {
        /* Exact same fill/stroke ramp as body-full (fullKeyframes); geometry unchanged here. */
        const [a, b, t] = bracket(fullKeyframes, p);
        const e = easeInOutCubic(t);
        cy = 10;
        rx = 5;
        ry = 10;
        fillOp = lerp(a.fillOp, b.fillOp, e);
        strokeW = lerp(a.strokeW, b.strokeW, e);
      } else if (p < 0.55) {
        cy = 10;
        rx = 5;
        ry = 10;
        fillOp = 0;
        strokeW = LIMB_STROKE;
      } else {
        cy = lerp(10, SLOT_O_CY, morphT);
        rx = lerp(5, 5.5, morphT);
        ry = lerp(10, 10.5, morphT);
        fillOp = 0;
        strokeW = lerp(LIMB_STROKE, STROKE_END, morphT);
        cx = arcX;
      }
      elHead.setAttribute("cx", cx.toFixed(2));
      elHead.setAttribute("cy", cy.toFixed(2));
      elHead.setAttribute("rx", rx.toFixed(2));
      elHead.setAttribute("ry", ry.toFixed(2));
      elHead.setAttribute("fill-opacity", fillOp.toFixed(3));
      elHead.setAttribute("stroke-width", strokeW.toFixed(2));
    }

    if (elBot) {
      if (!showSplit) {
        elBot.setAttribute("opacity", "0");
        elBot.setAttribute("transform", "");
      } else {
        elBot.setAttribute("opacity", "1");
        const flat = lerpFlat(BOTTOM_CUP, BOTTOM_U, morphT);
        elBot.setAttribute("d", dFromCubics(flat));
        elBot.setAttribute("fill-opacity", "0");
        const sw = lerp(LIMB_STROKE, STROKE_END, morphT);
        elBot.setAttribute("stroke-width", sw.toFixed(2));
        elBot.setAttribute("transform", `translate(${(-arcX).toFixed(2)} 0)`);
      }
    }

    if (elTop) {
      if (!showSplit) {
        elTop.setAttribute("opacity", "0");
        elTop.setAttribute("transform", "");
      } else {
        elTop.setAttribute("opacity", "1");
        const flat = lerpFlat(TOP_CAP, TOP_MVAL, morphT);
        elTop.setAttribute("d", dFromCubics(flat));
        elTop.setAttribute("fill-opacity", "0");
        const sw = lerp(LIMB_STROKE, STROKE_END, morphT);
        elTop.setAttribute("stroke-width", sw.toFixed(2));
        const mGap = SHIFT_M_FOR_GAP * morphT;
        elTop.setAttribute("transform", `translate(0 ${mGap.toFixed(2)})`);
      }
    }

    if (elArmL && elArmR) {
      const aL = lerpPts(ARM_L_0, ARM_L_1, morphT);
      const aR = lerpPts(ARM_R_0, ARM_R_1, morphT);
      const swA = lerp(LIMB_STROKE, STROKE_END, morphT);
      const mGap = SHIFT_M_FOR_GAP * morphT;
      const armTf = `translate(0 ${mGap.toFixed(2)})`;
      elArmL.setAttribute("points", ptsToAttr(aL));
      elArmR.setAttribute("points", ptsToAttr(aR));
      elArmL.setAttribute("stroke-width", swA.toFixed(2));
      elArmR.setAttribute("stroke-width", swA.toFixed(2));
      elArmL.setAttribute("transform", armTf);
      elArmR.setAttribute("transform", armTf);
      elArmL.setAttribute("opacity", "1");
      elArmR.setAttribute("opacity", "1");
    }

    if (elLegL && elLegR) {
      const legPts = lerpPts(LEG_0_L, LEG_1, morphT);
      const legR0 = [
        [6, 90],
        [6, 108],
        [6, 128],
      ];
      const legPtsR = lerpPts(legR0, LEG_1, morphT);
      const swL = lerp(LIMB_STROKE, STROKE_END, morphT);
      const iGap = SHIFT_I_FOR_GAP * morphT;
      const legTf = `translate(0 ${iGap.toFixed(2)})`;
      elLegL.setAttribute("points", ptsToAttr(legPts));
      elLegR.setAttribute("points", ptsToAttr(legPtsR));
      elLegL.setAttribute("stroke-width", swL.toFixed(2));
      elLegR.setAttribute("stroke-width", swL.toFixed(2));
      elLegL.setAttribute("transform", legTf);
      elLegR.setAttribute("transform", legTf);
      /* Single “I” stroke: fade the duplicate leg out as the two merge. */
      elLegL.setAttribute("opacity", "1");
      elLegR.setAttribute("opacity", (1 - morphT).toFixed(3));
    }

    if (hint) {
      hint.style.setProperty("--hint-op", p > 0.04 ? "0" : "1");
    }
  }

  let tickId = null;

  function armAboutTick() {
    if (tickId !== null) return;
    tickId = window.setInterval(() => {
      if (document.hidden) return;
      update();
    }, 36);
  }

  function disarmAboutTick() {
    if (tickId !== null) {
      clearInterval(tickId);
      tickId = null;
    }
  }

  function bounceUpdate() {
    if (!document.hidden) update();
  }

  window.addEventListener("scroll", bounceUpdate, { passive: true, capture: true });
  document.documentElement.addEventListener("scroll", bounceUpdate, {
    passive: true,
    capture: true,
  });
  window.addEventListener("touchmove", bounceUpdate, { passive: true, capture: true });
  window.addEventListener("touchend", bounceUpdate, { passive: true, capture: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("scroll", bounceUpdate, { passive: true });
    window.visualViewport.addEventListener(
      "resize",
      () => {
        bounceUpdate();
      },
      { passive: true }
    );
  }
  if ("onscrollend" in window) {
    window.addEventListener("scrollend", bounceUpdate, { passive: true });
  }
  window.addEventListener("resize", bounceUpdate);

  window.addEventListener("pageshow", () => {
    if (!document.hidden) {
      armAboutTick();
      bounceUpdate();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      disarmAboutTick();
    } else {
      armAboutTick();
      bounceUpdate();
    }
  });

  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver(
      () => {
        bounceUpdate();
      },
      { threshold: [0, 0.01, 0.05, 1], rootMargin: "120px 0px 120px 0px" }
    );
    io.observe(section);
  }

  /* Safari iOS + Reduce Motion often suppresses rAF; interval keeps scroll-driven morph in sync. */
  armAboutTick();
  bounceUpdate();
  window.requestAnimationFrame(() => {
    bounceUpdate();
  });
  window.setTimeout(bounceUpdate, 120);
})();

/* Contact: saludo — brazo der. con tramos 1 : 2 : 0.5 (hombro-codo : codo-muñeca : muñeca-mano),
   misma escala que figures.js (F1 ≈ 10, 20, 5 u SVG). Secuencia 1→…→9 luego 3→2→1. */
(function contactHeroWave() {
  if (!document.body.classList.contains("contact-page")) return;

  const arm = document.getElementById("contactWaveRightArm");
  if (!arm) return;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const F1 = "14,32 16,42 19,62 20,67";
  const F2 = "14,32 24,32 44,32 49,32";
  const F3 = "14,32 24,32 24,12 24,7";
  /* Arco del saludo: 40° entre 70° y 110° (desde horizontal, CCW en coords matemáticas;
     en SVG el antebrazo va codo→muñeca con L2=20, L3=5). 110° = más hacia la cabeza. */
  const F4 = "14,32 24,32 17.16,13.21 15.45,8.51";
  const F5 = "14,32 24,32 30.84,13.21 32.55,8.51";

  const forwardThenReturn = [
    F2,
    F3,
    F4,
    F5,
    F4,
    F5,
    F4,
    F5,
    F3,
    F2,
    F1,
  ];

  const DELAY_MS = 2000;
  const STEP_MS = 260;

  let seqTimers = [];

  function clearSeq() {
    seqTimers.forEach((id) => clearTimeout(id));
    seqTimers = [];
  }

  function runWaveSequence() {
    clearSeq();
    arm.setAttribute("points", F1);
    forwardThenReturn.forEach((pts, i) => {
      seqTimers.push(
        window.setTimeout(() => {
          arm.setAttribute("points", pts);
        }, DELAY_MS + i * STEP_MS)
      );
    });
  }

  runWaveSequence();

  window.addEventListener(
    "pageshow",
    (ev) => {
      if (ev.persisted) {
        runWaveSequence();
      }
    },
    { passive: true }
  );
})();