# imad-janbain.github.io

Personal portfolio — hand-coded, no frameworks, no trackers.
Typeset in Instrument Serif & IBM Plex. Deploys to GitHub Pages as a static site.

## Structure

```
.
├── index.html       # Single-page layout with anchored sections
├── styles.css       # Design system (tokens at top) + components + responsive
├── script.js        # Waveform generator, scroll reveals, nav behavior
├── favicon.svg      # Terracotta signature mark
├── 404.html         # Matching 404 page
├── me-portrait.jpg  # Conference poster photo — used in About section
├── me-head.jpg      # Square headshot — used as nav avatar
├── me-full.jpg      # Full-resolution backup photo
└── README.md
```

No build step. No dependencies. Open `index.html` directly in a browser to preview.

## Deploy to GitHub Pages

The fastest path (clean root URL at `https://imad-janbain.github.io`):

1. Create a new **public** repo on GitHub named exactly:
   `imad-janbain.github.io`
   (The repo name matching your username + `.github.io` is what tells GitHub
   Pages to serve it at the root URL.)

2. Clone it locally, then copy everything from this folder into the repo root:

   ```bash
   git clone https://github.com/imad-janbain/imad-janbain.github.io.git
   cd imad-janbain.github.io
   cp -r /path/to/site/. .
   git add .
   git commit -m "Initial portfolio site"
   git push origin main
   ```

3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` · `/ (root)` → Save**.

4. ~30 seconds later it's live at `https://imad-janbain.github.io`.

**Note on your username:** your GitHub handle is `Imad-Janbain` (capitalized),
so the user-site repo must be named `Imad-Janbain.github.io` (GitHub Pages
URLs are case-insensitive; the published URL will appear as
`imad-janbain.github.io`).

### Alternative — project site (sub-path URL)

If you'd rather keep it in any other repo name (e.g. `portfolio`):

1. Push the files to `main`.
2. Settings → Pages → Source: `main` / root.
3. It'll be live at `https://imad-janbain.github.io/<repo-name>/`.

The site uses only relative asset paths, so both setups work without edits.

## Custom domain (optional)

1. Add a file named `CNAME` in the repo root containing just your domain:
   ```
   imadjanbain.com
   ```
2. DNS:
   - `A` records pointing `@` to GitHub's Pages IPs
     (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`)
   - `CNAME` record for `www` → `imad-janbain.github.io`
3. In Settings → Pages, add your domain and enable "Enforce HTTPS" after the
   certificate provisions.

## Making edits

- **Text content** — `index.html`. Each section has a comment block at the top.
- **Colors / spacing / typography** — `styles.css`. Every design token lives
  as a CSS custom property at the very top of the file. Changing `--accent`
  once updates every terracotta touch across the site.
- **Projects** — the `<section class="work">` block. Duplicate any
  `<li class="project reveal">` to add a new one. Available modality badges:
  `badge--ts` · `badge--cv` · `badge--geo` · `badge--llm` · `badge--control`
  · `badge--paper`.
- **Waveform shape** — `script.js`, the constants at the top
  (`SAMPLES`, `AMP_LOW`, `AMP_HIGH`) shape the background time series.
  Change the seed `generateSeries(7)` for a different but still deterministic
  shape.
- **Photo** — swap `me-portrait.jpg` and `me-head.jpg` with any replacements.
  Portrait is used in the About section (roughly 320×500 display size,
  any aspect close to 3:4 works); head is used as a round avatar in the nav
  (square crop, 60×60 display).

## Design

- Palette: warm-sand paper `#F2EDE4` · deep espresso ink `#1A1815` ·
  terracotta accent `#C44A1D` · forest-green `#2F4A3A` for "published"
  grounding · slate `#3D4A5C` for geospatial badges · amber `#B07B1A`
  for LLM/NLP badges.
- Fonts: Instrument Serif (display), IBM Plex Sans (body), IBM Plex Mono
  (labels & metadata). All served from Google Fonts.
- No analytics, no cookies, no trackers.

## Credits

- Fonts: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif),
  [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans),
  [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).
- Photo © Imad Janbain.
