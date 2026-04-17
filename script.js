/* =============================================================================
   Imad Janbain — portfolio · script.js
   - Generates a deterministic time-series waveform in the hero (SVG path)
   - Runs a "scanning" highlight along it (suggests live prediction)
   - Reveals sections on scroll via IntersectionObserver
   - Shrinks the nav after the hero
   No dependencies. No build step.
   ============================================================================= */

(() => {
  "use strict";

  /* -------------------------------------------------------------------------
     1. Waveform generator
     -------------------------------------------------------------------------
     Looks like a real multi-scale time series:
       - Smooth low-frequency trend
       - Higher-frequency noise layered on top
       - A few "extreme events" (spikes) — a nod to the flood-forecasting work
     Deterministic (mulberry32 seeded) so the shape doesn't shift between loads.
  ------------------------------------------------------------------------- */

  const WAVE_WIDTH  = 1440;
  const WAVE_HEIGHT = 420;
  const SAMPLES     = 260;
  const MID_Y       = WAVE_HEIGHT * 0.55;
  const AMP_LOW     = 85;
  const AMP_HIGH    = 28;

  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function generateSeries(seed = 7) {
    const rand = mulberry32(seed);
    const pts = [];

    // Pick a few "extreme event" indices for spikes
    const spikes = new Set();
    while (spikes.size < 3) {
      spikes.add(Math.floor(rand() * (SAMPLES - 20)) + 10);
    }

    let low = 0;
    let high = 0;

    for (let i = 0; i < SAMPLES; i++) {
      low += (rand() - 0.5) * 0.25;
      low  = Math.max(-1, Math.min(1, low * 0.985));
      high = (rand() - 0.5) * 2;

      const x = (i / (SAMPLES - 1)) * WAVE_WIDTH;
      let y  = MID_Y + low * AMP_LOW + high * AMP_HIGH;

      if (spikes.has(i)) {
        y -= 55 + rand() * 40;
      }

      pts.push({ x, y });
    }
    return pts;
  }

  // Catmull-Rom → cubic Bézier for smooth path
  function toSmoothPath(points) {
    if (points.length < 2) return "";
    const d = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d.push(
        `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ` +
        `${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ` +
        `${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
      );
    }
    return d.join(" ");
  }

  function paintWaveform() {
    const basePath = document.getElementById("wave-path");
    const highlightPath = document.getElementById("wave-highlight");
    if (!basePath || !highlightPath) return;

    const pts = generateSeries(7);
    const d = toSmoothPath(pts);
    basePath.setAttribute("d", d);
    highlightPath.setAttribute("d", d);

    // Animate a bright segment traveling along the path — the "scan"
    const totalLen = highlightPath.getTotalLength();
    highlightPath.style.strokeDasharray = `260 ${totalLen}`;
    highlightPath.animate(
      [{ strokeDashoffset: totalLen }, { strokeDashoffset: -260 }],
      { duration: 14000, iterations: Infinity, easing: "linear" }
    );
  }

  /* -------------------------------------------------------------------------
     2. Scroll reveals — inverted pattern
     -------------------------------------------------------------------------
     Content is visible by default in the stylesheet. This function adds a
     temporary `.is-pending` class to elements that are BELOW the fold so
     they fade in as the user scrolls. Above-fold elements are never hidden.
     If JS fails or is delayed, everything stays visible and the page remains
     legible — no flash of invisible content.
  ------------------------------------------------------------------------- */
  function setupReveals() {
    const els = document.querySelectorAll(".reveal, [data-stagger]");

    if (!("IntersectionObserver" in window)) return; // everything stays visible

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const toObserve = [];

    // Hide only elements below the fold
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= vh * 0.9) {
        el.classList.add("is-pending");
        toObserve.push(el);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-pending");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    toObserve.forEach((el) => io.observe(el));
  }

  /* -------------------------------------------------------------------------
     3. Nav shrink-on-scroll
  ------------------------------------------------------------------------- */
  function setupNav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const SHRINK_THRESHOLD = 40;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        nav.classList.toggle("is-shrunk", window.scrollY > SHRINK_THRESHOLD);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------------
     4. Boot
  ------------------------------------------------------------------------- */
  function init() {
    paintWaveform();
    setupReveals();
    setupNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
