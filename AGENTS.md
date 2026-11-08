# Bonobo guild context

Shared context for <Bonobo>, a Horde raiding guild on WoW Forever (EU PvP).
Read it to answer questions about the guild, to make something for it, or to
propose a change to it.

## Reading

| File | Holds |
|---|---|
| `guild.md` | Who we are, who decides what, timeline, history, leadership direction |
| `expectations.md` | What the guild expects of members and raiders, ranks |
| `glossary.md` | Guild terms |
| `decisions/` | Every decision, open or settled, with its source |
| `raids/` | One report per raid night |
| `brand/theme.md` | The look for anything made for the guild; `pages/recruitment.html` is the reference |
| `publishing.md` | What may appear here and in anything made from it. Read it before writing |

Every statement carries a status. Present it by its status:

| Status | Present it as |
|---|---|
| **rule** | Guild policy, set by leadership |
| **direction** | Where leadership says the guild is heading; not policy yet |
| **practice** | How Fun Police raided on Classic Era: history, not Bonobo policy |
| **open** | Undecided. Write a placeholder such as `[raid days]` |

When a page and a decided file in `decisions/` disagree, the decision is newer:
use it and say the page is stale.

## Proposing a change

Every change is a pull request holding one entry. Officers review and merge.

1. **Pick the recipe** below. Done when you know the template, filename and PR title.
2. **Write the entry.** Done when every front matter field is filled (or left
   empty where the template allows it) and `source` names where it was said:
   channel and date, or a message link.
3. **Check it against `publishing.md`.** Done when every rule there holds.
4. **Open the pull request** with the PR template. Done when every box is
   ticked, or explained in the description.

The format check on GitHub runs on every pull request. When it fails, its
message names the file and field: fix it and push again. Run it locally with
`node .github/scripts/check.js`.

### Decision

- New question or decision: copy `templates/decision.md` to
  `decisions/YYYY-MM-DD-slug.md`. The date is when it was decided, or raised
  if open; the slug is a few lowercase words joined by hyphens.
- Settling an open question: edit its existing file to `status: decided`.
- Replacing a decided one: a new file with `supersedes: <old filename>`, and
  the old file set to `status: superseded`.
- Proposing a decision officers haven't taken yet: write it as decided, with
  `decided_by: officers` and `source: this pull request`. Merging the pull
  request is the decision; officers fix the date when they merge.
- Update every page named in `affects` in the same pull request, as **rule**.
- PR title: `decision: <title>`

### Raid report

- Copy `templates/raid-report.md` to `raids/YYYY-MM-DD-<raid>.md`
  (`2026-12-03-molten-core.md`).
- Report at group level: bosses, composition counts, what went well, what to
  fix. The raid leader is the only player named.
- PR title: `raid: <raid> <date>`

### Handbook page

`guild.md`, `expectations.md`, `glossary.md`, `brand/`, `pages/`.

- Edit in place and keep each statement's status.
- A new or changed **rule** comes with its decision file, as a decision PR.
- PR title: `guide: <what changed>`

### Correction

Typos, broken links, a fact gone stale. Give the source for a changed fact.
PR title: `fix: <what>`
