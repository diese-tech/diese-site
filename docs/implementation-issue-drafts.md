# Portfolio Implementation Issue Drafts

These issue drafts track the remaining portfolio implementation phases after the Phase 1 scaffold/homepage pass.

## Phase 1 review summary

The deployed portfolio at https://diese-portfolio.vercel.app/ appears to substantially complete Phase 1:

- Root homepage uses the accepted headline and role framing.
- Homepage includes Hero, Featured Projects, Also Built, Build Process, Stack, About, and Contact sections.
- Featured project order is SwiftDispatch, Serpent Ascension League, then ThreeTails Booking.
- Also Built includes GodForge, YapHub, Atlas, and the future sanitized internal tool.
- Discord services content is preserved at `/services/discord`.
- Resume placeholder exists at `/resume.pdf`.

Phase 1 should be considered complete once the implementation repo confirms the build/lint checks pass and the project/case-study placeholder routes are intentionally accepted as Phase 2 scope.

---

## Issue: Phase 2 — Build project case studies and project detail routes

### Summary

Create dedicated project/case-study pages for the featured projects and establish the reusable case-study content model.

### Scope

- Create reusable project/case-study layout.
- Add detail pages for:
  - SwiftDispatch
  - Serpent Ascension League
  - ThreeTails Booking
- Add sections for:
  - Overview
  - Problem
  - Users/audience
  - Solution
  - Key features
  - Technical decisions
  - Challenges/tradeoffs
  - What I would improve next
  - Links/assets
- Add placeholder screenshot/video slots where final assets are missing.
- Ensure cards on the homepage link to the detail pages.
- Keep copy outcome-first and employer-friendly.

### Acceptance criteria

- Each featured project has a working route and complete first-pass case-study copy.
- Missing screenshots/videos use intentional placeholders, not broken links.
- Case-study pages are responsive and readable on mobile.
- Case-study pages include SEO metadata.
- Homepage project links no longer read as placeholder links unless intentionally marked as drafts.

---

## Issue: Phase 3 — Add motion polish and progressive 3D hero enhancement

### Summary

Add tasteful motion and the desktop Builder Console hero enhancement without making the site dependent on WebGL or overly distracting.

### Scope

- Add Framer Motion polish for section reveals, hover states, and navigation transitions.
- Implement a desktop Builder Console visual inspired by modular product/workflow blocks.
- Keep all critical text and navigation in HTML, not canvas-only content.
- Provide WebGL fallback.
- Provide simplified mobile visual/animation.
- Respect reduced-motion preferences where practical.
- Avoid game-like navigation or immersive interactions.

### Acceptance criteria

- Site remains usable with JavaScript/3D failures or no WebGL support.
- Reduced-motion users do not receive unnecessary motion-heavy effects.
- Mobile does not require the full 3D scene.
- Lighthouse/performance remains acceptable after motion/3D additions.
- Motion supports the product story rather than distracting from content.

---

## Issue: Phase 4 — Replace placeholders and polish launch assets

### Summary

Replace temporary placeholders with launch-ready portfolio assets and complete final content polish.

### Scope

- Replace `/resume.pdf` with the real resume PDF.
- Add real project screenshots and/or short demo clips.
- Add social preview/Open Graph image.
- Add final project links:
  - Live app links
  - GitHub links
  - Demo links where applicable
- Proofread all copy.
- Verify contact links.
- Decide whether phone remains resume-only.
- Confirm ThreeTails public/private access before launch.

### Acceptance criteria

- Resume download is real and current.
- No visible placeholder copy remains on launch-critical pages.
- Project links are accurate and open in the expected targets.
- Open Graph/social preview looks correct.
- Contact CTAs work.
- Final mobile review is complete.

---

## Issue: Phase 5 — Add optional analytics, monitoring, and post-launch iteration hooks

### Summary

Add lightweight measurement and operational polish after the core portfolio is stable.

### Scope

- Add privacy-conscious analytics if desired.
- Add contact form backend only if email links are not sufficient.
- Add Sentry/error monitoring only if runtime complexity warrants it.
- Keep blog-ready architecture hidden until content exists.
- Add a small post-launch checklist for future project additions.

### Acceptance criteria

- Analytics, if added, are documented and privacy-conscious.
- No unnecessary backend complexity is introduced.
- Blog routes remain hidden unless real posts are ready.
- Future project/case-study additions are documented.

---

## Issue: Future — Sanitized internal tool case study

### Summary

Prepare a sanitized private-work case study only after all sensitive employer details have been removed.

### Scope

- Remove employer/company identifiers.
- Use fake or generalized data.
- Rebuild screenshots with non-sensitive data if screenshots are used.
- Generalize proprietary workflows.
- Add confidentiality note.
- Focus on problem, constraints, technical approach, and impact.

### Acceptance criteria

- No proprietary data or identifying employer details are present.
- Case study is safe to publish publicly.
- The project strengthens the real-world workflow positioning without confidentiality risk.
