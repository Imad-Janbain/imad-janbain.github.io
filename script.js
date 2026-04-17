/* =============================================================================
   Imad Janbain — portfolio · script.js
   ============================================================================= */
(() => {
  "use strict";

  const CHART_W = 1000;
  const CHART_H = 200;

  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function generateSeries({ seed, samples, yMid, ampLow, ampHigh, spikes }) {
    const rand = mulberry32(seed);
    const pts = [];
    const spikeSet = new Set();
    while (spikeSet.size < spikes) {
      spikeSet.add(Math.floor(rand() * (samples - 20)) + 10);
    }
    let low = 0;
    let high = 0;
    for (let i = 0; i < samples; i++) {
      low += (rand() - 0.5) * 0.28;
      low  = Math.max(-1, Math.min(1, low * 0.985));
      high = (rand() - 0.5) * 2;
      const x = (i / (samples - 1)) * CHART_W;
      let y  = yMid + low * ampLow + high * ampHigh;
      if (spikeSet.has(i)) y -= 30 + rand() * 30;
      pts.push({ x, y });
    }
    return pts;
  }

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

  function paintInstrumentChart() {
    const baseline = document.getElementById("inst-baseline");
    const forecast = document.getElementById("inst-forecast");
    if (!baseline || !forecast) return;

    const basePts = generateSeries({
      seed: 7, samples: 220, yMid: CHART_H * 0.55,
      ampLow: 36, ampHigh: 10, spikes: 3,
    });
    const forePts = generateSeries({
      seed: 42, samples: 220, yMid: CHART_H * 0.42,
      ampLow: 30, ampHigh: 6, spikes: 1,
    });

    baseline.setAttribute("d", toSmoothPath(basePts));
    forecast.setAttribute("d", toSmoothPath(forePts));
  }

  function buildPixelGrid() {
    const grid = document.getElementById("pixel-grid");
    if (!grid) return;
    const cols = 12;
    const rows = 6;
    const total = cols * rows;
    const rand = mulberry32(3);
    grid.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div");
      const row = Math.floor(i / cols);
      const col = i % cols;
      const base = (row * 0.25 + col * 0.13) % 5;
      const jitter = rand() * 1.5;
      const delay = (base + jitter).toFixed(2);
      const opacity = (0.15 + rand() * 0.5).toFixed(2);
      cell.style.animationDelay = `${delay}s`;
      cell.style.setProperty("--px-o", opacity);
      grid.appendChild(cell);
    }
  }

  function setupReveals() {
    const els = document.querySelectorAll(".reveal, [data-stagger]");
    if (!("IntersectionObserver" in window)) return;

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const toObserve = [];
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

  function setupNav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const SHRINK = 40;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        nav.classList.toggle("is-shrunk", window.scrollY > SHRINK);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function init() {
    paintInstrumentChart();
    buildPixelGrid();
    setupReveals();
    setupNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
