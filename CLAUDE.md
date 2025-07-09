# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

### Development Notes
- Uses Vite for fast development and building
- TypeScript compilation happens before build (`tsc -b && vite build`)
- ESLint configured for React with strict TypeScript rules

## Architecture Overview

This is a React + TypeScript + Vite project implementing a "Queen de Q" branded platform with role-based authentication.

### Application Structure
The app follows a role-based dashboard pattern:
- **Unauthenticated users** → `AuthPage` component
- **Admin users** → `AdminDashboard` component  
- **Client users** → `ClientDashboard` component

### Key Components (Expected but Not Yet Implemented)
- `src/components/Auth/AuthPage.tsx` - Authentication interface
- `src/components/Dashboard/AdminDashboard.tsx` - Admin dashboard
- `src/components/Dashboard/ClientDashboard.tsx` - Client dashboard

### Authentication System
- **Context**: `src/contexts/AuthContext.tsx` provides authentication state management
- **Mock Users**: 
  - Admin: `admin@example.com` / `password123`
  - Client: `client@example.com` / `password123`
- **Features**: Login, registration, logout, localStorage persistence
- **User Interface**: `{ id, email, firstName, lastName, role: 'admin' | 'client' }`

### Design System - "Queen de Q"
The project uses a sophisticated design system with three themed color palettes:

#### Color Palettes
- **Royal**: Purple (`#3B1E50`), Gold (`#D6AE60`), Champagne (`#D4B5A5`), Velvet (`#1B1B1B`), Pearl (`#FDF7F2`)
- **Cabinet**: Aubergine (`#4B2E43`), Patina (`#B79D74`), Powder (`#E8C5C1`), Parchment (`#F5EBD6`), Ink (`#181818`)  
- **Ritual**: Indigo (`#241B2F`), Smoked Gold (`#C8A96B`), Vintage (`#E3BBB2`), Moon Milk (`#FFF9F3`), Amber (`#776650`)

#### Typography
- **Headings**: Playfair Display (serif) - elegant, classical
- **Body**: Raleway (sans-serif) - modern, readable
- **Quotes**: Playfair Display (serif) - mystical tone

#### Styling Stack
- **Tailwind CSS**: Utility-first styling with custom Queen de Q configuration
- **Framer Motion**: Animation library for smooth transitions
- **PostCSS**: CSS processing with autoprefixer

### Configuration Files
- `src/config/theme.ts` - Central theme configuration
- `src/config/colors.ts` - Complete color palette definitions
- `src/config/fonts.ts` - Typography configuration
- `src/config/assets.ts` - Asset path configuration

### Project Structure
```
src/
├── components/         # React components (Auth/, Dashboard/, UI/)
├── contexts/          # React contexts (AuthContext implemented)
├── config/            # Theme and design system configuration
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── assets/            # Static assets
├── styles/            # Additional styling
└── lib/               # Utility functions
```

### TypeScript Configuration
- Strict TypeScript enabled with comprehensive linting rules
- React JSX transformation configured
- ESNext modules with bundler resolution
- Separate configs for app (`tsconfig.app.json`) and Node (`tsconfig.node.json`)

### Development Guidelines
- Follow the existing Queen de Q design system colors and typography
- Use the `useAuth` hook for authentication state management
- Implement components with proper TypeScript interfaces
- Use Tailwind classes following the custom configuration
- Follow the role-based rendering pattern established in `App.tsx`

## Current Status
The project has a solid foundation with authentication, design system, and configuration in place. The main UI components (AuthPage, AdminDashboard, ClientDashboard) need to be implemented to complete the application.


# 🏰 Queen de Q – Platform Dashboard (Same design DNA as queendeq.com)

## Style constraints
- Tailwind + Playfair Display / Inter palette; royal-purple `#3B1E50`, imperial-gold `#D6AE60`, rose-champagne `#D4B5A5`.
- Re-use glassmorphism‐card pattern from landing.
- Responsive left sidebar (logo, nav) + top bar (spots-left badge, music toggle).

---

## Sprint 0 · Dashboard shell (1 day)
1. **Layout**  
   - Clone a Tailwind admin scaffold (e.g. TailAdmin) as the base grid 🕸 :contentReference[oaicite:0]{index=0}.
   - Left nav links: **Cards, Quiz, Journal, Chat, Shop**.
2. **Global widgets**  
   - Music loop player + 🎵/🔇 toggle (auto-mute if `prefers-reduced-motion`) 🕸 :contentReference[oaicite:1]{index=1}.  
   - Spots-left badge (static JSON).
3. **Route stubs** (`/cards`, `/quiz`, `/journal`, `/chat`, `/shop`) with fade-in placeholder.

Commit → `chore: dashboard shell + global widgets`

---

## Sprint 1 · Core modules (2 days)

### 1. Cards page
- Masonry-like grid 2→6 cols using Tailwind cards 🕸 :contentReference[oaicite:2]{index=2}.  
- At least **8 demo faces** → hover **tilt parallax** (±6°) 🕸 :contentReference[oaicite:3]{index=3}.  
- Click = GSAP Flip zoom + side panel (name, punchline, mirror question).

### 2. Mini-quiz
- 8 radio-icon screens, stagger 120 ms entrance; progress bar (`2 / 8`) 🕸 :contentReference[oaicite:4]{index=4}.  
- Result screen: 4 Queen portraits, confetti burst (`canvas-confetti`) 🕸 :contentReference[oaicite:5]{index=5}.  
- Event `quiz_finished` to Plausible.

### 3. Chat “Afternoon Tea”
- 360×540 dialog, porcelain motif, avatar grand-mère 👑.  
- *Typing…* dots 2 s → bubble **“Bientôt disponible / Coming soon”**.  
- Input disabled, tooltip “Soon”.  Use UXPin chat-a11y tips 🕸 :contentReference[oaicite:6]{index=6}.

Commit → `feat: cards grid, mini-quiz, chat placeholder`

---

## Sprint 2 · Journal & Shop (1.5 days)

### 1. Journal d’âme
- 800×500 canvas, 3 SVG stickers; drag-drop coords saved to localStorage 🕸 :contentReference[oaicite:7]{index=7}.  
- Toast “Sauvegardé / Saved” + Reset.

### 2. Boutique mock
- Grid 4 products; Tailwind product-card blocks 🕸 :contentReference[oaicite:8]{index=8}.  
- Filters drawer (Catégorie / Prix) non-wired.  
- “Ajouter” buttons disabled (`opacity-40 cursor-not-allowed`).

### 3. Live banner
- Sticky bottom “☕ Tea Time — 13 juillet 19h GMT+1”, slide-in, ✖ dismiss→localStorage 🕸 :contentReference[oaicite:9]{index=9}.

Commit → `feat: journal d’âme, shop mock, live banner`

---

## Sprint 3 · Polish (1 day)
1. **Legal & PWA**: `/legal/privacy`, `/legal/terms`; `manifest.webmanifest`, 512 px icon 🕸 :contentReference[oaicite:10]{index=10}.  
2. **Axe-core 0**, **Lighthouse ≥ 90**; lazy-load all heavy libs (confetti, Keen-slider).  
3. **Translations**: every label bilingual FR / EN inside same string.

Commit → `release: prototype dashboard v1.0` and deploy preview.

