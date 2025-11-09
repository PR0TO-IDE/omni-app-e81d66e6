# RideConnect Minimal

RideConnect Minimal is a light, minimalist remix of the original RideConnect mobile web app.
It keeps the same core workflows—discovering rides, hosting rides, and managing your rider
profile—while simplifying the visual language and emphasizing larger, airier cards that feel
at home on modern devices.

## Key changes in this remix

- Light-first theme:
  - App defaults to a soft light background with dark text for clarity.
  - Neutral grayscale palette with a single strong accent (slate/black) for key actions.
  - Reduced gradients and heavy glows in favor of clean surfaces and subtle shadows.

- Larger, minimalist cards:
  - Ride cards, profile card, and empty states use larger rounded corners and more padding.
  - Typography slightly increased for titles and metadata for better readability.
  - Content hierarchy is simplified: title, essentials (date/time/location), optional stats,
    and concise actions.

- Clean navigation:
  - Top header is compact, fixed, and uses a simple text lockup.
  - Centered segmented control (Discover / My rides / Profile) just under the header.
  - Bottom navigation uses simple glyphs and a light pill background; active state is a solid
    dark pill for clear focus.

- Mobile-first layout:
  - Designed around a max-width mobile viewport (max-w-md) centered on larger screens.
  - Fixed header and bottom nav with scrollable content between.
  - All interactive elements sized for touch (min-height and padding adjusted accordingly).

## Architecture overview

This project uses:

- Next.js 15 (App Router, `app/` directory)
- TypeScript
- Tailwind CSS for utility-first styling
- Local storage (via a small `lib/api` helper) for persistence

Primary files:

- `app/layout.tsx` — Root layout, font setup, global wrappers.
- `app/globals.css` — Global Tailwind layers and CSS variables for theming.
- `app/page.tsx` — Main mobile experience, including tabs, sections, and state management.
- `app/components/RideCard.tsx` — Larger minimalist ride card.
- `app/components/CreateRideForm.tsx` — Light, simple ride creation form.
- `app/components/ProfileCard.tsx` — Rider profile editor in a clean card.
- `app/components/BottomNav.tsx` — Minimal bottom navigation bar.
- `components/ui/*` — Primitive UI building blocks (Button, Card, Input, Textarea).

## Theming details

The light theme is defined through CSS variables in `app/globals.css` and consumed by Tailwind
via `tailwind.config.ts`:

- Background and surface:
  - `--background`: soft near-white
  - `--card`: pure white
  - `--border`: light neutral borders

- Text and accents:
  - `--foreground`: dark slate for primary text
  - Buttons and key CTAs use solid `bg-slate-900` / white text for strong contrast.
  - Secondary elements use subtle grays to reduce visual noise.

Dark-mode tokens remain defined under `.dark` for potential future use, but the minimalist
variant intentionally renders in light mode by default.

## Usage

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## UX notes

- Discover tab:
  - Shows seeded example rides on first load.
  - Each ride card supports join and bookmark actions.

- My rides tab:
  - Splits rides into "Created by you" and "You are joining" using the same large card style.

- Profile tab:
  - Lets riders describe their location, pace, distance, ride styles, and a short bio using
    the minimalist profile card.

- Create ride:
  - Opened via the fixed "+ Create a ride" button.
  - Appears as a light sheet from the bottom with the same minimal, touch-friendly controls.

This remix is designed to feel calm, focused, and easy to scan: one accent color, clear
hierarchy, and generous whitespace around every primary element.