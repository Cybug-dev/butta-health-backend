# AGENTS.md — Rules for any AI agent working on this repo

Read this file fully before doing anything. Then read [WORKING.md](WORKING.md) to see where work stopped. Repo-specific deploy/env notes live in [CLAUDE.md](CLAUDE.md).

## 1. Start-of-session checklist

1. Read `AGENTS.md` (this file) and `WORKING.md`. Nothing else yet.
2. If `WORKING.md` has an **In progress** item, resume it before starting anything new (unless the user says otherwise).
3. Restate the task to yourself in one line. Only then start locating code.

## 2. Token discipline (most important rule)

Every file read, search, and command costs tokens. Spend them only on what the current task needs.

**Do**
- Search before reading: `grep`/Grep for the exact route, function, model, or error string first, then open only the matching file.
- Read only the relevant range of a file (use line offsets) once grep gives you the line number.
- Use the map in §3 to jump straight to the right layer.
- Reuse what is already in context — don't re-read a file you just read or edited.
- Batch independent searches/reads in one step.
- Stop exploring as soon as you have enough to act.

**Don't**
- Don't list or read whole directories "to understand the codebase".
- Don't open `node_modules/`, `dist/`, `src/generated/`, `logs/`, `uploads/`, or `package-lock.json`.
- Don't read the whole `prisma/schema.prisma` — grep for the model name.
- Don't run the full test suite when one targeted script (`npm run test:auth`, `test:ai`, etc.) covers the change.
- Don't produce long summaries, plans, or explanations the user didn't ask for.
- Don't spawn sub-agents or do "extra" refactors, audits, or cleanups outside the task.

## 3. Where things live (locate fast)

Request flow: `src/routes/*` → `src/middleware/*` → `src/controllers/*.controller.ts` → `src/services/*` → Prisma (`src/config/database.ts`).

| Need to change…                 | Look in                                   |
|---------------------------------|-------------------------------------------|
| An endpoint path / wiring       | `src/routes/`, then `src/app.ts`          |
| Request handling                | `src/controllers/<feature>.controller.ts` |
| Business logic / DB queries     | `src/services/`                           |
| Input validation                | `src/schemas/`                            |
| Auth (cookie, JWT, password)    | `src/auth/`, `src/middleware/`            |
| AI extraction / providers       | `src/ai/`, `src/ai/providers/`            |
| Env vars                        | `src/config/env.ts`, `render.yaml`        |
| Errors                          | `src/errors/api-error.ts`                 |
| API docs                        | `src/docs/openapi.ts`                     |
| DB schema / migrations          | `prisma/` (grep the model)                |
| Tests                           | `test/<feature>.test.ts`                  |

Feature names are consistent across layers (e.g. `health-event.controller.ts` ↔ `health-event` service/schema/test) — use that to jump between them.

## 4. Keep it simple

- Make the smallest change that fully solves the task. Follow existing patterns in the neighbouring code.
- No new abstractions, helpers, config options, or dependencies unless the task needs them.
- No speculative "future-proofing", no rewrites of working code you happened to see.
- Match the surrounding style, naming, and comment density.
- Verify with `npm run typecheck` and the one relevant test script.

## 5. Commits

Conventional Commits, written like a senior engineer: a precise subject plus bullet points of what actually changed and why.

```
fix(auth): reject expired refresh tokens before rotation

- Check token expiry in token.ts before issuing a new pair
- Return 401 TOKEN_EXPIRED instead of a generic 500
- Add test covering expired-token refresh in auth.test.ts
```

- Subject: `type(scope): imperative summary`, ≤ 72 chars.
- Body: one bullet per meaningful change; say *what* and, when not obvious, *why*.
- Never add AI attribution (no `Co-Authored-By: Claude`, no "Generated with…").
- Never commit secrets. Push to the current branch after committing (see CLAUDE.md).

## 6. Keep WORKING.md current

`WORKING.md` is the hand-off log. Update it **as you work**, not only at the end:

- When you start a task → add it under **In progress** with the files involved.
- After each meaningful step → tick it off / note the next step (so a cut-off session can resume).
- When done → move it to **Recently completed** as a one-line entry (with commit hash).
- Prune aggressively: keep only the last ~10 completed items; delete step-by-step detail for finished work. Anything still true long-term (a gotcha, a decision) goes under **Notes**, briefly.
- Keep the whole file short — it is read at the start of every session, so every line costs tokens.
