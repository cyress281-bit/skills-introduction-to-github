# 🏍️ Ride Radar

> The radar for motorcycle riders. Find nearby riders, join crew rides, discover local events — all on a live dark-mode map.

![Ride Radar](https://img.shields.io/badge/Expo-54.0.33-blue?logo=expo) ![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)

---

## Overview

Ride Radar is a React Native (Expo) app built for the motorcycle community. It features a full-screen dark map radar showing nearby riders, upcoming crew rides, and local events. The app is designed with a neon-green-on-black aesthetic optimized for night riding.

**Key features:**
- 🗺️ **Live Radar Map** — Full-screen dark Google Maps with custom markers for rides, events, and your location
- 🏍️ **Crew Rides** — Browse, join, and create group motorcycle rides
- 📍 **Events** — Discover meetups, rallies, charity runs, and bike shows nearby
- 👥 **Community** — Feed for local rider updates (coming soon)
- 👤 **Rider Profiles** — Bike info, ride stats, and privacy controls
- 🔐 **Auth** — Supabase email/password authentication with auto profile creation
- ⚠️ **Safety Alerts** — Report and view road hazards (coming soon)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 54 + [Expo Router](https://expo.github.io/router) v4 |
| Language | TypeScript 5.9 (strict mode) |
| UI | React Native 0.81 |
| Maps | `react-native-maps` with Google Maps provider |
| Backend | [Supabase](https://supabase.com) (Auth + Postgres + Realtime) |
| Navigation | Expo Router file-based routing with custom tab bar |
| Animation | React Native `Animated` API |
| Storage | `@react-native-async-storage/async-storage` |

---

## Folder Structure

```
ride-radar/
├── app/
│   ├── _layout.tsx          # Root layout (GestureHandler, SafeArea, Stack)
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx        # Login screen
│   │   └── signup.tsx       # Sign up screen
│   └── (tabs)/
│       ├── _layout.tsx      # Tab layout with custom tab bar
│       ├── index.tsx        # 🎯 RADAR — main map screen
│       ├── rides.tsx        # Crew rides list
│       ├── community.tsx    # Events & community feed
│       └── profile.tsx      # Rider profile & settings
├── components/
│   ├── radar/
│   │   ├── RadarHeader.tsx  # Glass header with live rider count
│   │   └── RadarFAB.tsx     # Floating action button
│   ├── ui/
│   │   ├── LiveIndicator.tsx
│   │   ├── NeonButton.tsx
│   │   ├── PulsingRiderIndicator.tsx
│   │   ├── ThemedText.tsx
│   │   └── ThemedView.tsx
│   └── navigation/
│       └── CustomTabBar.tsx # Glowing pill navigation bar
├── constants/
│   ├── Colors.ts            # Brand color palette
│   └── MapStyle.ts          # Dark Google Maps style
├── data/
│   └── mockData.ts          # LA-area mock rides, events & riders
├── hooks/
│   ├── useAuth.ts           # Supabase auth state
│   ├── useLocation.ts       # Device GPS location
│   └── useRadarData.ts      # Map pins & nearby riders
├── lib/
│   └── supabase.ts          # Supabase client config
├── supabase/
│   └── schema.sql           # Full DB schema with RLS policies
├── types/
│   └── index.ts             # TypeScript interfaces
├── app.json                 # Expo config
├── babel.config.js
├── package.json
└── tsconfig.json
```

---

## Setup

### Prerequisites

- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [Expo Go](https://expo.dev/go) app on your phone, or iOS Simulator / Android Emulator
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. This creates all tables, RLS policies, and triggers (including auto-profile creation on signup)
4. Enable **Realtime** for the `rides` and `safety_alerts` tables in the Supabase dashboard

### 4. Configure Google Maps (Android)

For Android, you need a Google Maps API key:

1. Get a key from [Google Cloud Console](https://console.cloud.google.com/) with Maps SDK for Android enabled
2. Replace `YOUR_IOS_GOOGLE_MAPS_API_KEY` in `app.json`
3. Add your `google-services.json` to the repo root

On iOS, `react-native-maps` uses Apple Maps by default (no key needed for development).

### 5. Run the app

```bash
# Start Expo dev server
npm start

# Or target a specific platform
npm run ios
npm run android
npm run web
```

Scan the QR code with Expo Go, or press `i` for iOS simulator / `a` for Android emulator.

---

## Environment Variables

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (safe to expose) |

All `EXPO_PUBLIC_` prefixed variables are bundled into the client build. Never put secret keys here.

---

## Supabase Schema Overview

| Table | Description |
|---|---|
| `profiles` | Rider profiles extending `auth.users` |
| `rides` | Crew rides with location, schedule, participants |
| `events` | Meetups, rallies, charity runs, bike shows |
| `ride_participants` | Many-to-many: users ↔ rides |
| `safety_alerts` | Crowdsourced road hazard reports (2hr TTL) |

All tables have Row Level Security (RLS) enabled. Public data is readable by all; writes require authentication.

---

## Color System

The app uses a neon-green-on-black aesthetic defined in `constants/Colors.ts`:

| Token | Value | Use |
|---|---|---|
| `neonGreen` | `#39FF14` | Primary brand / CTAs |
| `background` | `#0D0D0D` | App background |
| `surface` | `#1A1A1A` | Cards, inputs |
| `pinCrewRide` | `#39FF14` | Crew ride map markers |
| `pinEvent` | `#007AFF` | Event map markers |
| `pinCurrentUser` | `#FF3B30` | Your location marker |

---

## Roadmap

- [ ] Real-time rider location sharing via Supabase Realtime + PostGIS
- [ ] Create ride / create event flows
- [ ] Route planning with waypoints
- [ ] Safety alert system (report & upvote hazards)
- [ ] Push notifications for nearby rides
- [ ] Community posts / ride stories feed
- [ ] Ride history & stats tracking
- [ ] Social graph (follow riders, crew groups)
- [ ] Weather overlay on radar map
- [ ] Apple Watch / Wear OS companion

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Open a pull request

---

## License

MIT — see [LICENSE](LICENSE) for details.
<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey cyress281-bit!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/cyress281-bit/skills-introduction-to-github/issues/2)

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

