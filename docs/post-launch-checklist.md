# Post-launch checklist

Operational notes for running the portfolio after launch. Covers the Phase 5
decisions (issue #8) and the repeatable process for adding future work.

## Analytics

- **What:** [Vercel Web Analytics](https://vercel.com/docs/analytics) via
  `@vercel/analytics`, mounted once in `app/layout.tsx` (`<Analytics />`).
- **Privacy:** cookieless — no cookies, no cross-site tracking, no persistent
  device identifiers, so no consent banner is required. Visitors are counted
  per-visit with an anonymous session hash that expires after the visit.
- **Where to look:** the Analytics tab of the `portfolio-site` project in the
  Vercel dashboard. Enable the toggle there the first time if data isn't
  flowing.
- **Custom events:** none. Page views are enough for a portfolio; add
  `track()` calls only if a concrete question needs answering.

## Decisions made (and when to revisit)

- **No contact form backend.** `mailto:` links cover contact. Revisit only if
  email links demonstrably lose inquiries.
- **No Sentry / error monitoring.** The site is statically prerendered with no
  runtime data paths; there is nothing meaningful to alert on. Revisit if the
  site ever gains server actions, API routes, or auth.
- **Blog stays hidden.** `/blog` exists as scaffold but is linked from no
  navigation. Do not add nav links until real posts exist.

## Adding a new project / case study

All project content lives in `content/projects.ts`. No component changes are
needed for a standard addition.

1. Add a record to `featuredProjects` (top three, homepage entrypoint cards)
   or `alsoBuilt` (index only), using the next sequential `ref` (R-009, …).
   Required fields: `slug`, `ref`, `title`, `label`, `domain`, `year`, `role`,
   `status`, `stackShort`, `stack`, `summary`, `synopsis`, `outcomes`.
2. Optional fields:
   - `live` / `repo` — render as a Links section on the case file.
   - `caseStudy` — full dossier treatment (problem, users, solution,
     keyFeatures, technicalDecisions, challenges, improvements, exhibits,
     links). Write copy problem-first per `docs/adr/0004`.
   - `exhibits` entries render as intentional placeholder boxes until real
     screenshots exist; replace captions when assets land.
3. The homepage "shipped" / "records" counters, the index table, the case-file
   route (`/projects/<slug>`), and prev/next navigation all derive from the
   data — verify them, don't edit them.
4. Status conventions: `active` (● Active), `archived` (○ Archived),
   `placeholder` (row renders dimmed/unlinked as ○ Private).

## Pre-publish checks

- `npm run lint && npm run build` — both must pass.
- Click through the new case file at desktop and ~390px mobile width.
- Confirm the homepage index shows the new ref and the record count looks
  right.
- If the year range in the Index of Work header (`app/page.tsx`) has fallen
  behind, update it.
- Share-preview sanity check: `/opengraph-image` renders the social card; the
  record-strip footer mentions the ref range (`R-001 — R-00N`), so bump it in
  `app/opengraph-image.tsx` when a record is added.
