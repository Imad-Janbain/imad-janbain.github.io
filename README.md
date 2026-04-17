# imad-janbain.github.io

Personal portfolio — hand-coded, soft dark mode, editorial. No frameworks, no trackers.
Deploys to GitHub Pages as a static site.

## Design

**Direction:** *Scientific Instrument* — soft-dark editorial console in lifted slate, with an electric-lime signal accent. Not near-black; a warmer, softer dark that keeps surfaces and type crisp without the heaviness of pure ink. Precise monospace labels, a signature instrument-strip visualization (time-series chart with a scan line and a Sentinel-1 SAR pixel-tile grid).

**Palette:** `#181B21` slate · `#EEEDE7` warm cream · `#C6FF3D` electric lime.
Secondary data-type colors for badges (warm orange · cyan · violet · muted slate).

**Fonts:** Instrument Serif (display), IBM Plex Sans (body), IBM Plex Mono
(labels). Served from Google Fonts.

## Structure

```
.
├── index.html        # Single-page site with anchored sections
├── styles.css        # Design tokens at top; components below
├── script.js         # Instrument chart, pixel grid, scroll reveals, nav
├── favicon.svg       # Lime signal on slate
├── 404.html          # Matching 404
├── me-hero.jpg       # Hero portrait (SWOT satellite mission)
├── me-portrait.jpg   # About-section photo (conference poster session)
└── README.md
```

No build step. No dependencies. Open `index.html` directly to preview.

## Sections

Hero · `§ 01` About · `§ 02` Selected work (institutional showcase at top,
six projects below) · `§ 03` Research & publications · `§ 04` Certifications
& programs (HDCRS summer school featured, Coursera certificates, further
training) · `§ 05` Skills · `§ 06` Contact.

## Deploy to GitHub Pages

1. Create a new **public** repo on GitHub named exactly
   `imad-janbain.github.io` (user-site convention).
2. Copy the files, commit, push:
   ```bash
   git clone https://github.com/Imad-Janbain/imad-janbain.github.io.git
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
- **Featured project / certification:** add `project--featured` to a
  `<li class="project">` and a `<span class="project__ribbon">` inside
  `.project__body`. For a featured certification use `cert--feature` inside
  `.certs__grid--feature`.
- **Scan-line hover effect (projects):** add `data-scan="1"` to any
  `<li class="project">` — used on CV-related projects.
- **Hero portrait replacement:** drop in a new `me-hero.jpg` (portrait
  aspect, ~900px wide recommended).
- **Instrument chart shape:** `script.js` — seeds inside `generateSeries({...})`.

## Credits

Fonts: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif),
[IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans),
[IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono). Photos © Imad Janbain.
