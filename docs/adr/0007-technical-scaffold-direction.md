# ADR 0007: Technical scaffold direction

## Status

Accepted

## Context

The current repository is a static HTML/CSS GitHub Pages site. The planned portfolio requires case studies, theme support, future blog structure, interactive/motion components, and maintainable content updates.

## Decision

Refactor toward a modern portfolio scaffold using:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Vercel deployment
- Structured project/case-study content
- Dark/light mode support
- SEO metadata for Dustin Nieves and Diese
- Blog-ready architecture, but no visible blog at launch

Motion/3D candidates:

- Framer Motion for interface transitions and scroll/hover animation
- Three.js / React Three Fiber for the optional desktop 3D hero enhancement

Optional later additions:

- Analytics
- Contact form backend
- MDX case studies
- Sentry/error monitoring if the site grows beyond static content

## Consequences

- A new scaffold is expected rather than incremental edits to the current static HTML page.
- The first implementation phase should establish layout, design tokens, theme, content model, and routes before visual polish.
- Blog support should be architected but hidden until there is actual content.
