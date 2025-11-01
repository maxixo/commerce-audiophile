# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router (routes, `layout.tsx`, `page.tsx`). Example: `app/headphones/page.tsx`.
- `components/`: Reusable UI in PascalCase, e.g., `components/ProductHighlight.tsx`.
- `public/assets/`: Static images and product media. Import with `/assets/...` paths.
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` (Tailwind v4 via `@tailwindcss/postcss`).

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server with HMR.
- `npm run build` — Production build for Next.js.
- `npm run start` — Run the production build locally.
- `npm run lint` — Lint using `eslint-config-next` rules.

Requirements: Node 18.17+ (or 20+) and npm 9+.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). React 19 + Next 16.
- Components: PascalCase filenames (`Footer.tsx`). Routes: lowercase directory names (`app/headphones/`).
- Indentation: 2 spaces. Prefer functional components and server components by default; use client components only when needed (`"use client"`).
- Styling: Tailwind CSS utility-first. Global styles in `app/globals.css`.
- Imports: Use absolute alias `@/*` where appropriate.

## Testing Guidelines
- No test runner is configured yet. If adding tests, use Jest + React Testing Library.
- File names: `*.test.ts` or `*.test.tsx`. Place next to the unit or under `__tests__/`.
- Aim for coverage on page components, shared UI, and critical helpers.

## Commit & Pull Request Guidelines
- Current history is minimal; adopt Conventional Commits going forward:
  - Examples: `feat: add headphones category page`, `fix: correct ProductHighlight layout`.
- PRs must include:
  - Clear description and linked issue (if any).
  - Screenshots/GIFs for UI changes.
  - Checklist: `npm run lint` and `npm run build` pass locally.

## Security & Configuration Tips
- Secrets: Use `.env.local` (gitignored). Access via `process.env.*`.
- Assets: Optimize images before adding to `public/assets/`. Avoid oversized binaries.
- Accessibility: Include alt text for images and use semantic HTML.

