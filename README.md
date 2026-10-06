# حلول رِفد · Hulool Rifad

**Open-source AI solutions & reusable assets library.**

Rifad is a structured ecosystem for discovering, previewing, testing, customizing, versioning, and contributing AI assets. It is deliberately more than a prompt collection: prompts, skills, agents, workflows, solutions, templates, images, and videos share a searchable, versioned registry with explicit lineage and licensing.

## Explore

- **Public site:** [Hulool Rifad](https://alsutanamer-ye.github.io/hulool-rifad/)
- **Architecture:** [`docs/architecture.md`](docs/architecture.md)
- **Contribution guide:** [`CONTRIBUTING.md`](CONTRIBUTING.md)
- **Agent guide:** [`AGENTS.md`](AGENTS.md)

## Features

- Unified client-side library search and filters
- Asset cards with versions, compatibility, ratings, tests, licenses, and lineage
- Variable-driven **Use Template** flow that never overwrites the source
- Prompt playground with deterministic checks and local test history
- English/Arabic UI with correct RTL support
- JSON registries and JSON Schemas, independent from application code
- Automated registry validation in GitHub Actions
- GitHub Pages deployment with no backend or proprietary runtime dependency

## Architecture

The first version is a lightweight static site. Library content lives in `registry/` and full asset definitions live in `library/`. The browser loads registry data at runtime, while the validation script catches invalid records, duplicate IDs, broken paths, and malformed variable definitions before deployment.

## Repository structure

```text
library/       Full Markdown/JSON source assets
registry/      Lightweight indexes consumed by the website
schemas/       JSON Schema contracts for every asset type
templates/     Authoring starters for new assets
scripts/       Validation and build helpers
website/       Static GitHub Pages application
docs/          Architecture and authoring guides
tests/         Automated validation tests
.github/       CI validation and Pages deployment
```

## Add an asset

1. Copy a starter from `templates/` into the matching `library/<type>/` directory.
2. Give it a globally unique ID such as `PROMPT-SEO-001`.
3. Add a registry summary to `registry/<type>.json`.
4. Validate with `python3 scripts/validate.py`.
5. Add tests or examples where useful.
6. Open a pull request using the checklist in `CONTRIBUTING.md`.

Detailed guides: [prompts](docs/prompt-guide.md), [skills](docs/skill-guide.md), [agents](docs/agent-guide.md), [workflows](docs/workflow-guide.md), and [solutions](docs/solution-guide.md).

## Local development

No package manager is required:

```bash
python3 scripts/validate.py
python3 -m http.server 8080 --directory website
```

Open `http://localhost:8080`. The Pages workflow runs validation, tests, and a static build check before deployment.

## License

Code and original sample assets are released under the [MIT License](LICENSE). Every asset records its own license and source. Do not add copyrighted or private material without permission.
