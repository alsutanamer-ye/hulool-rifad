# AI Agent Maintainer Guide

## Architecture

`registry/*.json` is the browser-facing index. Full source assets live under `library/`. JSON Schema files in `schemas/` define contracts. `website/js/app.js` renders the static experience without hard-coded library records. `scripts/validate.py` is the source of truth for structural validation.

## Rules

- Use semantic versioning (`MAJOR.MINOR.PATCH`).
- Use unique uppercase IDs with a type prefix.
- Keep records valid JSON and paths relative to the repository root.
- Never silently overwrite a customized asset; preserve `lineage`.
- Keep third-party dependencies out of the static site unless justified.
- Do not add secrets or unlicensed content.

## Add and validate

Copy a template, add the full asset, add a registry summary, then run:

```bash
python3 scripts/validate.py
python3 -m unittest discover -s tests -v
```

## Build and deploy

The site is already static. A local smoke check is `python3 -m http.server 8080 --directory website`. Push to `main`; `.github/workflows/deploy-pages.yml` builds and deploys via the official Pages actions.
