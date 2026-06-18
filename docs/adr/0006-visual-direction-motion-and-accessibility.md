# ADR 0006: Visual direction, motion, and accessibility

## Status

Accepted

## Context

The portfolio should display frontend ability with tasteful 3D and interaction. It should not be overly distracting, slow, game-like, generic, or too minimal. The site should be shareable with future employers and usable on desktop and mobile.

## Decision

Use a dark-primary visual identity with light mode support.

Use a restrained 3D/interactive concept for desktop: a "Builder Console" made of modular product/workflow blocks, subtle command-center cues, and connected-system visuals. Use 3D to reinforce the theme of building connected systems.

Mobile should use a simpler animation or static fallback instead of requiring the full desktop 3D scene.

The site must:

- Work without WebGL.
- Keep all critical text and navigation outside canvas/3D-only surfaces.
- Respect reduced-motion preferences where practical.
- Be highly polished on mobile.
- Avoid a full immersive/game-like portfolio experience.

## Consequences

- 3D is a progressive enhancement, not a dependency for understanding the site.
- Performance, accessibility, and readability remain more important than visual spectacle.
- The implementation should plan for fallback states from the beginning.
