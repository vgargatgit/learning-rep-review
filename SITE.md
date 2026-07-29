# GitHub Pages Site

The repository includes a static educational website under `site/` and an automated deployment workflow at `.github/workflows/pages.yml`.

## One-time activation

GitHub requires the Pages publishing source to be enabled for the repository:

1. Open **Settings** for the repository.
2. Select **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and run **Deploy learning site to GitHub Pages** if it did not start automatically.

After deployment, the site is expected at:

`https://vgargatgit.github.io/learning-rep-review/`

## Architecture

```text
site/index.html              landing page
site/reader.html             Markdown document reader
site/assets/styles.css       responsive visual design
site/assets/app.js           navigation, theme and progress behaviour
site/assets/reader.js        document loading, search and table of contents
.github/workflows/pages.yml  build and deployment pipeline
```

The workflow copies the static website into `_site/`, then copies the repository's educational Markdown into `_site/content/`. The reader fetches those files at runtime. The Markdown files therefore remain the canonical source; the website does not maintain duplicate paper content.

## Local preview

Because the reader fetches Markdown files, serve the assembled site over HTTP rather than opening `index.html` directly with a `file://` URL.

A simple local build equivalent is:

```bash
rm -rf _site
mkdir -p _site/content
cp -R site/. _site/
for item in README.md PROJECT_STATUS.md CONTRIBUTING.md references.bib papers experiments docs; do
  if [[ -e "$item" ]]; then
    cp -R "$item" _site/content/
  fi
done
python3 -m http.server 8000 --directory _site
```

Then open `http://localhost:8000`.
