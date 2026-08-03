# Utopia Frontend

This directory contains the React and TypeScript client for Utopia. For the product overview, full local setup, API configuration, and portfolio context, start with the [root README](../README.md).

## Responsibilities

- Render the material-driven spatial design workflow
- Manage material-to-theme assignments
- Build deterministic generation prompts from domain metadata
- Convert the bundled base-room image into an API-ready data URL
- Call the local generation API and display errors/results
- Persist generated gallery items in browser `localStorage`
- Provide localized interface copy

## Development

From the repository root:

```bash
npm install --prefix frontend
npm run dev
```

The frontend reads `VITE_UTOPIA_API_BASE_URL` from `frontend/.env`. The default points to `http://localhost:8787`, so start the server separately with `npm run dev:server` when testing generation.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

See the [Architecture Guide](../docs/ARCHITECTURE.md) for state ownership, the prompt pipeline, and common extension points.
