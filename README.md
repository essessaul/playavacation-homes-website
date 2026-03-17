# Playa Escondida Full Live System

This package is a full live-system scaffold:
- bilingual UI (English / Español selector)
- real Supabase-ready auth
- login and signup pages
- protected owner and admin pages
- listings from database or starter fallback
- per-listing owner login ID and password demo fields
- range date selection on property calendars
- booking creation flow
- booking total calculator

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Supabase setup
1. Create a Supabase project.
2. Copy `.env.example` to `.env`.
3. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. In Supabase SQL Editor run:
   - `supabase/schema.sql`
   - `supabase/seed.sql`

## Signup
Use `/signup` to create:
- guest accounts
- owner accounts
- admin accounts

## Login
Use `/login` for real sign-in through Supabase Auth.

## Important
The per-listing owner login ID and password shown on property pages are demo owner access fields stored on the property record. Real owner authentication is handled through Supabase Auth accounts and the `owner_properties` table.


## Airbnb-level calendar upgrade
- 2-month calendar layout
- interval selection / auto-range selection
- blocked dates support
- start date + end date logic
- full in-between highlighting
- live nights and total pricing
- optional add-ons inside the booking summary


Auto-range fix: clicking the first date sets check-in, clicking the second later date sets checkout, and hovering before the second click previews the full interval like Airbnb.


## Interactive mascot
- clickable floating Saul Playa mascot
- opens contact panel
- WhatsApp shortcut
- Email shortcut
- quick link to listings
