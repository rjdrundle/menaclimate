# Loop State — menaclimate.com

## Done
- [2026-06-25] Scaffolded Next.js 16 App Router + TS + Tailwind v4
- [2026-06-25] Copied assets (7 video clips + voiceover) → `public/assets/`, logos → `public/logo/`
- [2026-06-25] Set favicon to `logo/mena-climate-mark.svg` via `src/app/icon.svg`
- [2026-06-25] Built all sections + interactions + `/api/register`
- [2026-06-25] `npm run build` passes (TypeScript clean, no warnings)
- [2026-06-25] Smoke test green: `/` 200, `/api/register` 200 (valid) + 422 (invalid)
- [2026-06-25] Created GitHub repo `rjdrundle/menaclimate` (public), pushed
- [2026-06-25] Deployed to Vercel prod → https://menaclimate.vercel.app (HTTP 200)
- [2026-06-25] Attached custom domain menaclimate.com (DNS propagating)
- [2026-06-25] Split About into About (`#about`, gold, partnership) + Voices (`#speakers`, green, speakers + partners strip); pushed + redeployed
- [2026-06-25] Recorded baseline SEO audit (96/100, run against preview URL — see note)
- [2026-06-25] Trimmed meta description to 116 chars (under 920px SERP budget)
- [2026-06-25] Expanded JSON-LD: WebSite+SearchAction, BreadcrumbList, FAQPage, Person × 8 (speakers with LinkedIn sameAs)
- [2026-06-25] Added /privacy and /editorial pages + footer Legal column
- [2026-06-25] Added /llms.txt for AI-search/GEO discovery; exposed via `<link rel="alternate" type="text/plain">`
- [2026-06-25] Added sr-only hero narration transcript; narration script extracted as module constant so spoken text + transcript + audit surface stay in sync
- [2026-06-25] Footer reorganised to 4-column grid (Series / Contact / Legal / brand)
- [2026-06-25] Sitemap now includes /privacy and /editorial

## In flight
- Wait for DNS to propagate so menaclimate.com resolves to the Vercel deployment
- Re-run SEO audit against menaclimate.com (not the preview URL) once DNS resolves

## Blocked
- (none)

## Outcome
menaclimate.com is live on Vercel with the landing page rendered, JSON-LD
expanded to 14 schema types, two new trust pages (/privacy, /editorial),
llms.txt for AI-search, and the `#register` form posts to `/api/register`.

## Stop conditions
- Vercel shows live at https://menaclimate.com ✓ (DNS pending)
- 3 consecutive failed iterations on the same task, OR
- User decision needed (DNS, GitHub org, Vercel login).

## SEO/AI-search baseline (2026-06-25)
- Audit run: **96/100** (A) — https://menaclimate.vercel.app
- Known false-positives: robots/sitemap/canonical checks ran against the
  preview URL rather than the production domain. Re-run on menaclimate.com
  expected to lift the score to ~98+ once the same `/robots.txt`,
  `/sitemap.xml`, and canonical assets are visible at the apex.
- Real fixes shipped in this iteration: meta description trimmed, expanded
  JSON-LD (FAQPage, Person, BreadcrumbList, SearchAction), llms.txt,
  /privacy, /editorial, hero narration transcript, 4-col footer.
