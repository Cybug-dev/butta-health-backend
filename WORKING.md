# WORKING.md — Live agent state

Hand-off log between agent sessions. Rules for maintaining it are in [AGENTS.md](AGENTS.md) §6. Keep it short.

_Last updated: 2026-10-18_

## In progress

_None._

<!-- Template:
### <task title>
- Goal: <one line>
- Files: <paths>
- [x] done step
- [ ] next step  ← resume here
- Blockers/notes: <if any>
-->

## Up next

_None queued._

## Recently completed (keep last ~10)

- 2026-10-18 — Added AGENTS.md (agent rules) and WORKING.md (this log).
- `889f031` feat(server): log resolved NODE_ENV and AI_PROVIDER at startup
- `d2a7183` feat(ai): log underlying provider failure reasons server-side
- `5c78d13` fix(auth): use SameSite=None for the auth cookie in production
- `4e78ece` fix(server): trust one proxy hop in production for correct client IPs

## Notes (long-lived gotchas)

- See CLAUDE.md for env/deploy constraints (prisma.config.ts decoupling, test DB migrations via `pretest`, AI provider per env).
