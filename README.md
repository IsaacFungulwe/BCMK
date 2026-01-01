# BCMK Enterprises — Static Landing Page

This repository contains a single-page static website for BCMK Enterprises (glass & aluminium solutions).

What's included

- `bsmk.html` — the main HTML page (now links to an external stylesheet and uses a small React component for a contact card).
- `styles.css` — extracted stylesheet containing theme variables, layout, and component styles.
- `images/` — image assets referenced by the page.

Features added

- Dark / Light theme support via CSS variables. The current theme is stored in `localStorage` under `bcmk-theme`.
- A small React-powered contact card rendered into the header (`div#react-controls`). The component is implemented without JSX and uses production UMD builds of React and ReactDOM from UNPKG.
- Contact links (tel/mailto) and a compact theme toggle.

Additional notes

- The contact widget was extracted to `contact.js` and is loaded conditionally by `app.js` to avoid loading the widget on small screens. To force-load the widget in your browser, add `?contact=1` to the URL (for example: `http://localhost:8000/bsmk.html?contact=1`).
- A quick headless smoke-check script is included as `smokecheck.js`. It uses Puppeteer to open the page and report console errors/warnings.

How to run

Open `bsmk.html` in a browser. For the best local experience (relative image URLs and CORS-safe loading of fonts), serve the folder with a simple static server, for example:

```bash
# Python 3
python3 -m http.server 8000

# then open http://localhost:8000/bsmk.html
```

Headless smoke-check (developer convenience)

Run the smoke-check to confirm no console errors:

```bash
cd /path/to/repo
npm install # installs dev dependency puppeteer (if not already installed)
# either serve the folder and run smokecheck pointing at the localhost URL:
python3 -m http.server 8000 &
URL=http://127.0.0.1:8000/bsmk.html node smokecheck.js

# or run the check directly against the file (no server required):
URL="file:///$(pwd)/bsmk.html" node smokecheck.js
```

Notes and next steps

- The React code is small and runs via the production UMD bundles; no build step is required.
- If you'd like a production build without any CDN dependencies, I can convert the React code to a small vanilla JS widget or add a build step to prebundle and minify the component.
- I can also extract any inline scripts into a separate JS file if you prefer.

Next steps you might want

- Minify `app.js` and `styles.css` or add a simple npm build using Rollup + Terser — I can scaffold this if you want production assets.
- Move `contact.js` into a small build step so it can be tree-shaken/minified separately.

If you want any copy/text changes, visual refinements, or to add analytics or offline support, tell me which you'd like next.