# imad-janbain.github.io

Personal portfolio — hand-coded dark-mode site. No frameworks, no trackers.
Deploys to GitHub Pages as a static site.

## Design

**Direction:** Scientific Instrument (dark mode).
Built around the metaphor of a research-console display: deep obsidian chassis,
electric-lime signal indicators, precise monospace labels, and a signature
instrument-strip visualization showing a time-series chart with a scanning
laser line plus a satellite pixel-tile grid.

**Palette:** `#0B0C0E` base · `#EEEDE7` text · `#C6FF3D` accent.
Secondary data-type colors for badges (orange · teal · purple · mint).

**Fonts:** Instrument Serif (display), IBM Plex Sans (body), IBM Plex Mono
(labels). Served from Google Fonts.

## Structure

```
.
├── index.html       # Single-page site with anchored sections
├── styles.css       # Design tokens at top; components below
├── script.js        # Instrument chart, pixel grid, scroll reveals, nav
├── favicon.svg      # Electric-lime dot on obsidian
├── 404.html         # Matching 404
├── me-portrait.jpg  # Conference poster session photo (used in About)
└── README.md
```

No build step. No dependencies. Open `index.html` directly to preview.

## Deploy to GitHub Pages

1. Create a new **public** repo on GitHub named exactly
   `imad-janbain.github.io` (user-site convention).
2. Copy the files, commit, push:
   ```bash
   git clone https://github.com/imad-janbain/imad-janbain.github.io.git
   cd imad-janbain.github.io
   cp /path/to/site-files/* .
   git add .
   git commit -m "Portfolio"
   git push origin main
   ```
3. **Settings → Pages → Source: Deploy from a branch → `main` · `/ (root)`.**
4. Live at `https://imad-janbain.github.io` in ~30 seconds.

## Editing

- **Text:** `index.html` — sections are clearly commented.
- **Colors / spacing / typography:** all as CSS custom properties at the top
  of `styles.css`. Change `--accent` once and every signal element updates.
- **Modality badges:** `badge--ts` · `badge--cv` · `badge--geo` · `badge--llm`
  · `badge--control` · `badge--paper`.
- **Scan-line hover effect:** add `data-scan="1"` to any `<li class="project">`.
- **Instrument chart shape:** `script.js` — seeds inside `generateSeries({...})`.

## Credits

Fonts: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif),
[IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans),
[IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono). Photo © Imad Janbain.
