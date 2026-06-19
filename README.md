# Ler Juntos — Landing Page

Landing page premium dark animada para o app Ler Juntos (leitor EPUB social).

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (animações)
- Lenis (smooth scroll)
- Lucide React (ícones)

## Setup

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy Vercel

```bash
npx vercel
```

Ou conecta repo no dashboard da Vercel — zero config.

## Estrutura

```
app/
├── layout.tsx        # fonts + metadata
├── page.tsx          # monta sections
├── providers.tsx     # Lenis smooth scroll
└── globals.css       # tailwind + custom styles
components/
├── Hero.tsx
├── Features.tsx
├── Screenshots.tsx   # sticky horizontal scroll
├── Social.tsx        # blocos alternados
├── EmailCapture.tsx  # visual-only
├── Footer.tsx
├── PhoneFrame.tsx    # iPhone-style frame reusável
├── ScrollProgress.tsx
├── FloatingCTA.tsx
└── mockups/          # mockups das telas (clubes, salas, etc)
public/
└── screenshots/      # screenshots reais do app
```

## Notas

- Email capture é **visual-only**. Pra integrar backend, adicionar API route em `app/api/subscribe/` + Resend/Mailchimp.
- Links de download apontam pra `#` — atualizar com link real da Play Store.
- Animações respeitam `prefers-reduced-motion`.
