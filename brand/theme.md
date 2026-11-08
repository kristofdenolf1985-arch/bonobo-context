# Bonobo theme

How anything made for the guild should look: web pages, Claude artifacts, Discord embeds, slides, images. It comes from the Bonobo Discord art (Nov 2026), which shows the guild's chimp in a Horde tabard on red Durotar rock in front of Orgrimmar at dusk, with a distressed bone-white BONOBO logo and a yellow `<Bonobo>` in-game nameplate.

The reference implementation is [`pages/recruitment.html`](../pages/recruitment.html). When in doubt, copy from it.

## Art

| File | What | Use |
|---|---|---|
| `brand/img/bonobo-banner.jpg` | Discord server banner, 1024×576 | Full-width page header |
| `brand/img/bonobo-icon.jpg` | Discord server icon, 160×160 | Footer, cards, avatars (round, ochre ring) |

The originals (icon 512 px, banner and invite splash 1024×576) come from the Discord server's `icon`, `banner` and `splash` fields. Fetch them again when the server art changes, and update this file if the look moves with it.

Use only the guild's own art. Don't draw the Horde crest, Blizzard logos or game screenshots by hand; the banner already carries the Horde symbol.

## Colour

Dark only. The art is a dusk scene, so pages stay dark even in a light theme: set `color-scheme: dark` on `:root` and skip the light and dark blocks.

```css
:root {
  --night: #151012;      /* page background: forge iron */
  --iron: #1f191a;       /* panels and cards */
  --rivet: #3a2e2c;      /* borders and rules */
  --bone: #eee4d2;       /* main text, the logo's bone-white */
  --ash: #b0a28f;        /* secondary text */
  --blood: #b8232b;      /* Horde banner red */
  --blood-deep: #7d1419; /* shadow under the title */
  --ochre: #e0823a;      /* Durotar rock: labels and card edges */
  --dusk: #9c7be0;       /* the violet sky */
  --nameplate: #f4d21f;  /* in-game guild tag yellow */
  --orc: #8cbf4f;        /* orc green */
  color-scheme: dark;
}
```

Each colour has one job:

| Colour | Means | Used for |
|---|---|---|
| `--blood` | Horde, warning, closed | War-banner tags, rule numbers, the line after headings, list markers, "Closed" stamps |
| `--ochre` | Label | Eyebrows, card top borders, "Planned", the ring around the icon |
| `--orc` | Done or decided | "Set" |
| `--dusk` | Open or unknown | "Open", "Not before 60", the faction and realm text after the nameplate |
| `--nameplate` | The guild's name, links | `<Bonobo>` and links. Nowhere else, so it keeps reading as the in-game tag |

For a Discord embed, use `--blood` as the colour: `0xB8232B`.

## Type

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Oswald:wght@500;600;700&family=Alegreya:ital,wght@0,400;0,600;1,400&display=swap">
```

| Role | Font | Treatment |
|---|---|---|
| Title (one per page) | Rubik Dirt, fallback Impact | Skewed `skewX(-7deg)` from the left, `text-shadow: 3px 3px 0 var(--blood-deep)`, like the logo |
| Headings, labels, pills, table heads | Oswald 500 to 700, fallback Arial Narrow | Uppercase with letter spacing for h2 and labels |
| Body | Alegreya, fallback Georgia | 18px, line height 1.6 |

Rubik Dirt is for the single title only. Outside the web (slides, images) use the same three fonts; all three are free on Google Fonts.

## Parts

- **Header.** The banner at full width (max 1180px, 16:9, `object-position: center 35%`), fading to `--night` at the bottom and the edges. The intro overlaps the fade by about 72px and holds:
  1. the nameplate: `<Bonobo>` in `--nameplate`, then `· Horde · EU PvP · WoW Forever` in `--dusk`, with a dark text shadow;
  2. the title;
  3. one lede sentence;
  4. a war-banner tag with the page's status and date.
- **War banner.** A red tag with a notched bottom, like the banners on Orgrimmar's walls: `background: var(--blood); clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)`. Use it for a status and for numbers in a numbered list. Don't use it as general decoration.
- **Section heading.** Oswald, uppercase, followed by a 2px line fading from `--blood` to transparent. An ochre eyebrow above it.
- **Card.** `--iron` with a `--rivet` border and a 3px `--ochre` top edge. Square corners: the look is iron and stone, so no rounded panels.
- **Pill.** Outlined, square, Oswald uppercase, in the colour of what it means (see Colour).
- **Footer.** The round guild icon with an ochre ring, then who to ask.

## Copy

Everything made for the guild follows [`publishing.md`](../publishing.md). Show each item's status (see `AGENTS.md`): a **rule** as set, **direction** as planned, an **open** decision as open.
