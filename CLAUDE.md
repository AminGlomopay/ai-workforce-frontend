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
- Load API data with `useSuspenseQuery`, not `useQuery`, so `data` is always defined (no optional chaining, no loading branches). Prefetch in the route `loader` with `queryClient.ensureQueryData(...)`, show loading with the route's `pendingComponent`, and handle failures in its `errorComponent` (handle expected errors such as 404, rethrow the rest). Data the layout needs goes in the `_authenticated` loader, which runs in parallel with child loaders. Mutations throw unexpected errors to the boundary with `throwOnError`.
- shadcn components install into `src/shared/components/ui` (see `components.json`). Use them instead of raw `<button>`/`<a>` where one fits (`Button asChild` for links).
- Write the bare minimum code. No speculative edge cases, no unused props or options.
- Prefer small components: one visual piece per file.
- When something goes wrong, throw an error. Never return `null` to signal failure.
- Files kebab-case, components PascalCase, constants UPPER_SNAKE_CASE. No comments that restate the code.
- Run `pnpm format`, `pnpm build` and `pnpm lint` before handing work back.
- Commit and push directly to `main` (`git push origin HEAD:main`); no feature branches or PRs for this project.

## Auth

Google OAuth only, handled by the backend (`ai-workforce`, `src/modules/auth`). The frontend never sees credentials:

- `/login` links to `/auth/google?returnTo=<absolute app URL>`; the backend sets the `aiw_session` cookie and redirects to `returnTo` if it is on the app origin, else to the app root. `/login?returnTo=<path>` carries the page the user was sent away from.
- The `_authenticated` layout route calls `GET /auth/me` in `beforeLoad`. A 401 redirects to `/login`; the user is exposed via `useCurrentUser()`. Any later 401 from a query or mutation does the same (global handler in `src/app/components/app.tsx`).
- All backend calls go through `requestBackend` (`src/shared/apis/request-backend.ts`): it sends cookies and throws `UnauthenticatedError` (401), `ValidationError` (400, `errors` field map) or `BackendError`.
- In production the frontend (`app.ai-workforce.glomo.one`) calls the backend cross-origin at `BACKEND_URL` (`src/shared/constants/backend.constants.ts`) with `credentials: 'include'`; the backend allows the frontend origin via CORS. In dev, `BACKEND_URL` is empty and Vite proxies `/auth` and `/workflows` to `http://localhost:51515` (page loads of `/workflows/*`, `Accept: text/html`, fall through to the SPA). The dev server runs on port 4719.
