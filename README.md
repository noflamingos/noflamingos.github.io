# Hockey Drills (Astro + Markdown + GitHub Pages)

## Local dev
```bash
npm install
npm run dev
```

## Add a drill
Create a new Markdown file in `src/content/drills/` and follow the frontmatter schema in the example.

## Deploy (GitHub Pages)
This repo includes a GitHub Actions workflow to build and deploy to GitHub Pages on every push to `main`.

### IMPORTANT
Update `astro.config.mjs`:
- set `site` to `https://noflamingos.github.io`
