# Tasks

This folder tracks work and follow-ups for the repo. Codex CLI and humans can use it to
understand what was done, what is next, and what must be revisited later.

## Structure (Kanban-style)

- `backlog/`   Ideas or tasks not yet started.
- `doing/`     Work currently in progress.
- `done/`      Completed work (keep brief notes of outcomes).
- `blocked/`   Waiting on something else (e.g., access, deployment, external approval).
- `scheduled/` Time-based tasks (e.g., check again in 2–3 days).
- `periodic/`  Recurring tasks (e.g., weekly GSC checks).

## How to write tasks

Create one Markdown file per task with this template:

```
# Title

- **Created:** YYYY-MM-DD
- **Owner:** name or "unassigned"
- **Status:** backlog | doing | done | blocked | scheduled | periodic
- **Context:** short description / why it matters
- **Next action:** concrete next step
- **Links:** (optional) URLs, file paths, GSC links, PRs
```

Move the file between folders as status changes.

## Notes

- Use short, specific titles.
- Keep updates minimal and factual.
- If a task is time-bound, include the target date in the file name, e.g.
  `2026-01-20-check-gsc-indexing.md`.
