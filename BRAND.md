# Tecplore Theme

The single reference for how Tecplore looks. The website and the Canva brand kit must both match this file.

- **Website:** the values live in `src/app/globals.css`, and pages use theme names only, never raw colours.
- **Canva:** the [Tecplore Theme design](https://www.canva.com/d/8qSXK9fJ_7JY9HB) holds the same values, and the Tecplore brand kit is built from it.

## Keeping them in sync

Canva and the website can't update each other automatically, so any change is made in three places:

1. Update the table below.
2. Update the matching value in `src/app/globals.css`.
3. Update the Tecplore Theme design and the brand kit in Canva.


## Colours

| Name | Hex | Website token | Use |
|---|---|---|---|
| Tecplore Blue | `#2563EB` | `primary`, `brand-blue` | Main buttons and links |
| Tecplore Indigo | `#4F46E5` | `brand-indigo` | Small accents |
| Tecplore Cyan | `#00C6FF` | `brand-cyan` | Small accents |
| Sky | `#60A5FA` | `brand-sky` | Small accents |
| Footer Cardinal | `#8C1C1C` | `footer` | Footer background, and the red in illustrations |
| Footer Text | `#F5DBDB` | `footer-muted` | Footer links, with white for headings |
| Ink | `#020617` | `ink` | Dark overlays on photos and video |
| Heading | `#0F172A` | `foreground` | Headings |
| Body Text | `#475569` | `body` | Paragraphs |
| Muted Text | `#64748B` | `muted-foreground` | Captions and secondary text |
| Border | `#E2E8F0` | `border` | Card and section borders |
| Input Border | `#CBD5E1` | `input` | Form fields and chips |
| Soft Background | `#F1F5F9` | `muted` | Alternate section background |
| Light Blue Tint | `#EFF6FF` | `accent` | Tags and hover backgrounds |
| Tag Text | `#1D4ED8` | `accent-foreground` | Text on the light blue tint |
| Error | `#EF4444` | `destructive` | Form errors only |
| White | `#FFFFFF` | `background`, `card` | Page and card backgrounds |

## Dev-only highlights

Yellow highlights and empty photo placeholders mark items waiting for confirmation. They are not part of the brand and must be off before going live. The master switch and list are in `src/lib/confirm.ts`.

## Colour rules

Solid colours only. Tecplore does not use gradients or glow effects, on the website or in Canva. The one exception is the recommendation star under How It Works on the homepage.

## Logo

The logo's teal to purple colours are part of the logo, so the no-gradient rule does not apply to it. Never recolour the logo.

Always place the logo on white or a light background so its colours stay clear. In the cardinal red footer it sits on a white circle.

## Type

The font is **Source Sans 3**.

| Style | Setting |
|---|---|
| Headings | Bold, Heading colour |
| Body | Regular, Body Text colour |
| Section labels | Semibold, uppercase, wide letter spacing, Tecplore Blue |

## Shapes and components

| Item | Rule |
|---|---|
| Buttons | Fully rounded pills |
| Primary button | Solid Tecplore Blue, white text |
| Secondary button | Tecplore Blue outline and text |
| Cards, media, inputs | 16px corners, Border colour outline |
| Tags and chips | Pills |

## Layout

Every page has a white menu and a white hero, followed by light sections that alternate between Soft Background and white, and ends with the cardinal red footer.
