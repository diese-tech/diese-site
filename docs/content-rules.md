# Portfolio content rules

These rules apply to public portfolio copy.

## Voice

- Use plain language.
- Prefer first person.
- Keep sentences short.
- Do not use em dashes.
- Do not make the writing corporate, inspirational, or sales-heavy.
- "Developer," "builder," and "I build software" are acceptable.
- Do not use engineering job titles unless a supplied source gives the exact title.

## Accuracy

- All projects were created in 2026.
- Do not invent clients, users, adoption, revenue, metrics, outcomes, research, interviews, or feedback.
- Do not turn a demo, concept, prototype, personal project, or unfinished project into client work.
- A deployment proves that a page is online. It does not prove outside use or that every feature works.
- Repository marketing copy is not proof that a feature works.
- Do not infer what users did before a project existed.
- Do not turn planned work into implemented work.
- Use `[VERIFY]` when a needed fact is missing.
- Remove an unsupported claim or mark it `[UNVERIFIED]`.

## Background

- Dustin has roughly eight years of combined operations experience across the United States Marine Corps and Disney.
- Disney experience began in 2021.
- Keep Marine Corps and Disney duties separate.
- The background is in operations and systems administration.
- Current software work is based partly on experience around operational workflows.

## Project fact records

Every public project must have these fields before copy is written:

- Project name
- Project type
- Created
- Why I started it
- What currently works
- What is partially built
- What is planned
- Tech actually used
- My role
- Who has used it
- Current status
- Live URL
- Repository
- Facts I am comfortable stating
- Claims that must not be made

The canonical records live in `content/projects.ts`.

## Project page structure

Each project page can show:

1. One-sentence summary
2. Short card description
3. First-person introduction
4. What works right now
5. Still working on
6. Under the hood
7. Confirmed usage, when there is a real audience to name

Omit empty sections. Keep `[VERIFY]` questions in the private fact record. Do not
put uncertainty disclaimers on the public page when the entire section can be
left out instead.
