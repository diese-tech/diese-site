# Diese portfolio

Personal portfolio for Dustin Nieves.

Live site: https://diese-portfolio.vercel.app/

## What is here

- A short background and experience section
- Seven project pages
- A fact record for every public project
- A small Discord work page
- A 3D project playground with a non-WebGL fallback
- A local PDF resume download

## Content rules

Project copy is stored with its source fact record in `content/projects.ts`.
Implemented features, unfinished work, and confirmed usage stay separate.
Verification questions remain in the fact record and do not appear on the public
project pages.

See `docs/content-rules.md` before changing project copy.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm test
npm run lint
npm run build
```
