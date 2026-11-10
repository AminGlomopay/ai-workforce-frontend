# ai-workforce-frontend

Frontend for ai-workforce, Glomo's event-driven agents. React 19 SPA (no SSR) with Vite, TanStack Router (file-based), Tailwind v4 and shadcn (Radix base).

## Design language

Every screen should feel futuristic, cutting edge, animated and a little cinematic, like the console of a live AI system rather than a generic SaaS dashboard. When in doubt, look at `src/features/auth/pages/login-page.tsx` and `src/features/workflows/components/workflows-empty-state.tsx`; new screens extend that language.

Principles:

- **Dark only.** Near-black canvas (`bg-background`), deep navy glow surfaces (`bg-grid-glow`: radial indigo glow + faint dot grid). No light theme.
- **One accent family.** Indigo `primary` for fills, glows and buttons; lavender `primary-soft` for highlights, live dots, step numbers and gradient text. No other hues except brand logos (e.g. the Google G).
- **The system feels alive.** Ambient motion is part of the design: orbiting/rotating rings, breathing orbs, packets flowing along SVG paths (`animateMotion`), scan lines, drifting aurora blobs, pulsing status dots, border beams. Motion is slow and continuous, never bouncy.
- **Entrances are choreographed.** Content enters with staggered `animate-in fade-in slide-in-from-bottom-*` and increasing `delay-*`, using `fill-mode-both`.
- **Instrument-panel typography.** Geist for headings and body; Geist Mono, uppercase, `tracking-widest`, `text-[10px]` for labels, eyebrows, status lines and counters. Headlines are large, tight (`tracking-tight`) and may carry a gradient span (`bg-clip-text`).
- **HUD details.** Corner marks (`CornerMarks`), thin 1px borders at low opacity, status bars (`● AGENT ONLINE · IDLE`), numbered steps (`01`–`04`), glows via `drop-shadow-[0_0_Npx_var(--primary)]` and `shadow-primary/40`.
- **Diagrams are SVG,** composed of small components, with geometry in constants and colours via Tailwind classes (`stroke-primary-soft/40`, `fill-background`), never hex.
- **Truthful copy.** Status and microcopy must reflect real state or backend facts (e.g. "12h session"), never invented metrics.

Tokens and animation utilities live in `src/index.css`: `primary`, `primary-soft`, `bg-grid-glow`, `border-beam`, `animate-scan`, `animate-aurora`, `animate-breathe`, `animate-spin-slow`, `animate-spin-reverse`. Add new keyframes there under `@theme`, not inline. `prefers-reduced-motion` disables CSS animations globally; keep it that way.

## Code conventions

- Feature folders, mirroring `glomopay-checkout/apps/checkout`: `src/features/<feature>/{apis,components,constants,contexts,errors,hooks,pages,providers,reducers,schemas,types,utils}` plus a required `public.ts`. Import other features only through `public.ts`. App-wide pieces go in `src/shared/`, app bootstrap in `src/app/`.
- Routes live in `src/routes/` (TanStack file-based) and stay thin: they wire a page from a feature's `public.ts`. `src/routeTree.gen.ts` is generated; commit it, never edit it.
- shadcn components install into `src/shared/components/ui` (see `components.json`). Use them instead of raw `<button>`/`<a>` where one fits (`Button asChild` for links).
- Write the bare minimum code. No speculative edge cases, no unused props or options.
- Prefer small components: one visual piece per file.
- When something goes wrong, throw an error. Never return `null` to signal failure.
- Files kebab-case, components PascalCase, constants UPPER_SNAKE_CASE. No comments that restate the code.
- Run `pnpm format`, `pnpm build` and `pnpm lint` before handing work back.
- Commit and push directly to `main` (`git push origin HEAD:main`); no feature branches or PRs for this project.

## Auth

Google OAuth only, handled by the backend (`ai-workforce`, `src/modules/auth`). The frontend never sees credentials:

- `/login` links to `/auth/google?returnTo=/`; the backend sets the `aiw_session` cookie and redirects to `returnTo` (relative paths only).
- The `_authenticated` layout route calls `GET /auth/me` in `beforeLoad`. A 401 redirects to `/login`; the user is exposed via `useCurrentUser()`.
- In production the frontend (`app.ai-workforce.glomo.one`) calls the backend cross-origin at `BACKEND_URL` (`src/shared/constants/backend.constants.ts`) with `credentials: 'include'`; the backend allows the frontend origin via CORS. In dev, `BACKEND_URL` is empty and Vite proxies `/auth` to `http://localhost:51515`. The dev server runs on port 4719.
