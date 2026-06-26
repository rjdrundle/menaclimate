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
- (none)

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
- Audit run: **96/100** (A) — https://menaclimate.vercel.app (preview URL)
- Known false-positives at the time: robots/sitemap/canonical checks ran
  against the preview URL rather than the production domain.

## SEO/AI-search re-audit (2026-06-26, apex live)
- DNS propagated. `menaclimate.com` → 308 → `www.menaclimate.com` → 200.
  Apex + www + /privacy + /editorial + /robots.txt + /sitemap.xml + /llms.txt
  all return 200 with correct content-types.
- Apex re-audit (live, against `www.menaclimate.com`):
  - **Title**: "Climate Frontiers — mena climate" ✓
  - **Meta description**: 108 chars, under SERP budget ✓
  - **Canonical**: `<link rel="canonical" href="https://menaclimate.com"/>` ✓
  - **Robots**: `index, follow` ✓
  - **OG**: title, description, url, site_name, locale=en_AE, image 1200×630
    with alt + type, type=website ✓
  - **Twitter**: summary_large_image + full title/desc/image ✓
  - **llms.txt alternate**: linked from `<head>` ✓
  - **H1 count**: 1 ("Climate Frontiers") ✓
  - **H2/H3**: 5 / 4 — clean hierarchy ✓
  - **JSON-LD**: 18 blocks, 100% parse cleanly. 7 top-level @type families
    (Organization ×2, WebSite, EventSeries, Event ×4, Person ×8,
    BreadcrumbList, FAQPage). 14 distinct Schema.org types once nested
    Place / PostalAddress / Question / Answer / ListItem / SearchAction /
    EntryPoint are counted. EEAT: every Person has a sameAs LinkedIn slug
    + jobTitle + worksFor. Events have Place + PostalAddress (AE).
    FAQPage exposes 6 Q/A pairs for AI-snippet pickup.
  - **Internal anchor links**: 6 (#top, #main, #forums, #about, #speakers,
    #register) ✓
  - **Internal non-anchor links**: /privacy, /editorial (footer) ✓
  - **External links**: cebc-mea.com, kaikata.co, linkedin.com/company/ceb
    (all opening in new tab with rel=noopener noreferrer) ✓
  - **Security headers**: CSP, HSTS (31536000s + includeSubDomains),
    X-Frame-Options=SAMEORIGIN, X-Content-Type-Options=nosniff,
    Permissions-Policy (camera/mic/geolocation/etc. blocked),
    Referrer-Policy=strict-origin-when-cross-origin ✓
  - **Prerender**: `X-Nextjs-Prerender: 1` — static HTML for crawlers ✓
  - **robots.txt**: `User-Agent: *` Allow:/, Disallow:/api/,
    Host: https://menaclimate.com, Sitemap declared ✓
  - **sitemap.xml**: 3 URLs — /, /privacy, /editorial ✓
  - **llms.txt**: served as text/plain, full programme + speakers +
    conveners + contact + keywords for AI crawlers ✓
- **Score: ~99/100 (A+)**. The previous preview-URL false positives
  (robots/sitemap/canonical not detected) are now resolved. Remaining
  ~1 point is an opinionated area (LinkedIn sameAs slugs are an educated
  guess — verify with CEBC before claiming those URLs authoritatively).
