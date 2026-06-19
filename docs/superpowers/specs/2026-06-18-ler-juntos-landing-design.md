# Ler Juntos — Landing Page Design

**Date:** 2026-06-18
**Status:** Approved

## Goal

Build a premium dark animated landing page for "Ler Juntos" (React Native EPUB reader with social book clubs). Single page, scroll storytelling. Convert visitors to Android download + iOS waitlist (visual-only for now).

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + Lenis (smooth scroll)
- **Icons:** Lucide React
- **Fonts:** Fraunces (serif display) + Inter (body)
- **Deploy:** Vercel

## File structure

```
ler-juntos-landing/
├── app/
│   ├── layout.tsx          # fonts, metadata
│   ├── page.tsx            # composes all sections
│   ├── globals.css         # tailwind + custom CSS
│   └── providers.tsx       # Lenis smooth scroll provider
├── components/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Screenshots.tsx
│   ├── Social.tsx
│   ├── EmailCapture.tsx
│   ├── Footer.tsx
│   ├── ScrollProgress.tsx
│   ├── FloatingCTA.tsx
│   ├── PhoneFrame.tsx       # reusable iPhone-style frame
│   └── mockups/
│       ├── ClubMockup.tsx
│       ├── RoomMockup.tsx
│       └── DiscussionMockup.tsx
├── public/
│   └── screenshots/
│       ├── light.png       # IMG_7905
│       └── dark.png        # IMG_7904
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## Visual system

**Palette:**
- BG: `#0a0a0f`
- Surface: `#13131a`
- Border: `#1f1f2e`
- Primary: `#7c3aed` → `#3b82f6` gradient
- Text: `#fafafa` / muted `#a1a1aa`

**Typography:**
- H1/H2: Fraunces serif, weight 500-600
- Body: Inter, weight 400-500

**Animations:**
- Hero text: word-by-word reveal stagger
- Mesh gradient background animated
- Spotlight follows cursor
- Cards: tilt 3D + glow on hover
- Scroll-triggered fade-up stagger
- Phone frames: float idle animation
- Smooth scroll with Lenis

## Sections

### 1. Hero
Split layout. Left: badge + H1 "Leia. Junte-se. Compartilhe." + subtitle + CTAs (Android download + iOS notify). Right: tilted phone mockup with light/dark crossfade. Mesh gradient BG + dot grid + cursor spotlight.

### 2. Features
3x2 grid. Cards: EPUB nativa, Clubes, Salas síncronas, Progresso, Timer, Dark mode. Tilt 3D + glow border on hover. Lucide icons in gradient circles.

### 3. Screenshots showcase
Sticky horizontal scroll Apple-style. 5 phone frames with synced captions. Background gradient shifts between frames.

### 4. Social section
3 alternating blocks (text ↔ visual):
- Clubes — mockup with book cards + chat
- Salas síncronas — mockup with avatars + timer
- Discussões — mockup with thread

### 5. Email capture (visual only)
Mesh gradient BG. H2 "iOS em breve." Inline form (input + button). No backend — shows success state on submit visually.

### 6. Footer
3 columns (Produto / Empresa / Legal) + bottom bar with logo + copyright.

## Global features

- Scroll progress bar (top)
- Floating "Baixar" CTA after 50% scroll
- Custom cursor (dot + ring)
- Reduced motion respected
- Lazy load screenshots
- Responsive: mobile-first, breakpoints at md/lg

## Out of scope

- Email backend (visual only this iteration)
- iOS App Store link (not published yet)
- i18n (PT-BR only)
- Analytics
- Blog / multi-page

## Success criteria

- Deploys to Vercel without errors
- Lighthouse perf > 85
- All animations 60fps
- Mobile responsive
- All sections render with real or mock content
