# imad-janbain.github.io

Personal portfolio site — hand-coded, no frameworks, no trackers.
Typeset in Instrument Serif & IBM Plex. Deploys to GitHub Pages as a static site.

## Structure

```
.
├── index.html       # Main page (single-page layout with anchor sections)
├── styles.css       # Design system + components + responsive styles
├── script.js        # Waveform generator, scroll reveals, nav behavior
├── favicon.svg      # Signature blue-dot mark
├── 404.html         # Matching 404 page
└── README.md
```

No build step. No dependencies. Open `index.html` directly in a browser to preview.

## Deploy to GitHub Pages

There are two ways to deploy. **Option A (recommended)** gives you a clean
root URL like `https://imad-janbain.github.io`.

### Option A — user site (root URL)

1. Create a new **public** repository on GitHub named exactly:
   `imad-janbain.github.io`
   (The repo name must match your username + `.github.io` — that's what tells
   GitHub Pages to serve it at the root URL.)

2. Clone it locally, then copy all files from this folder into the repo root:

   ```bash
   git clone https://github.com/imad-janbain/imad-janbain.github.io.git
   cd imad-janbain.github.io
   cp -r /path/to/site/. .
   git add .
   git commit -m "Initial portfolio site"
   git push origin main
   ```

3. On GitHub, go to **Settings → Pages**. Set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` · `/ (root)`
   - Save.

4. Wait ~30 seconds. Your site will be live at
   `https://imad-janbain.github.io`

### Option B — project site (sub-path URL)

If you'd rather keep the site in a regular repo (any name):

1. Create a repo, e.g. `portfolio`.
2. Copy the files into it and push to `main`.
3. Settings → Pages → Source: `main` / root.
4. The site will be live at `https://imad-janbain.github.io/portfolio/`.

Note: because this site uses only relative asset paths (`styles.css`,
`script.js`, `favicon.svg`), it works in either setup without modification.

## Custom domain (optional)

If you want to use a custom domain later:

1. Add a file called `CNAME` in the repo root containing only your domain:
   ```
   imadjanbain.com
   ```
2. Configure your DNS:
   - `A` records pointing `@` to GitHub's Pages IPs
     (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`)
   - `CNAME` record for `www` → `imad-janbain.github.io`
3. In Settings → Pages, enter your domain and enable "Enforce HTTPS"
   once the certificate provisions.

## Making edits

Everything is meant to be edited directly:

- **Text content**: `index.html` — written in plain HTML, clearly sectioned.
  Each section has a comment block at the top so you can find it fast.
- **Colors, spacing, typography**: `styles.css` — the top of the file declares
  every design token as a CSS custom property. Change `--accent` once and
  every signal-blue accent updates sitewide.
- **Projects**: they live in the `<section class="work">` block. To add a
  project, duplicate one `<li class="project reveal">` block and edit.
- **Waveform**: the parameters in `script.js` (`SAMPLES`, `AMP_LOW`, `AMP_HIGH`,
  number of spikes) shape the background time-series. Change the seed value
  in `generateSeries(7)` to get a different but still deterministic shape.

## Credits

- Fonts: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif),
  [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans),
  [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — all
  open-source, served from Google Fonts.
- No analytics, no trackers, no cookies.
