# React Native Learning Roadmap

Stack: Expo (managed, prebuild later when needed) + TypeScript.
Each project lives in its own folder at the repo root and is independently runnable.
Every project ships with a `DECISIONS.md` (ADR-style, like RoamPulse) explaining *why*,
not just *what* — since the point is to read the code and interrogate the choices.

Background: coming from 4+ years of Flutter (Clean Architecture, MVVM, Bloc/Riverpod,
Dio, Firebase). Explanations will lean on Flutter comparisons where useful
(e.g. StyleSheet vs Flutter's widget-based styling, Metro vs Dart's AOT/JIT,
React Navigation vs go_router, AsyncStorage vs shared_preferences).

## 1. simple — `01-quickstack` (Todo / Counter app)
- React Navigation basics (stack nav)
- useState/useReducer, component composition
- StyleSheet, FlatList basics
- Flutter parallel: setState/ValueNotifier equivalent

## 2. simple — `02-weatherfx` (Weather + forex viewer)
- REST API calls (fetch/axios), loading/error/empty states
- useEffect data fetching, custom hooks
- Flutter parallel: direct port of your StateLab weather/forex integration

## 3. medium — `03-notekeep` (Notes / expense tracker)
- Local persistence: AsyncStorage → then SQLite (expo-sqlite)
- Forms (react-hook-form), validation (zod)
- FlatList performance (keyExtractor, memoization, getItemLayout)

## 4. medium — `04-authgate` (Auth-gated app)
- Navigation guards, protected routes
- Secure token storage (expo-secure-store, Keychain/Keystore-backed)
- State management: Zustand or Redux Toolkit (contrast with Bloc/Riverpod)
- Context API vs external store tradeoffs

## 5. complex — `05-pulsechat` (Realtime chat)
- WebSockets, optimistic UI updates
- Push notifications (FCM — direct comparison to your Flutter FCM work)
- App state handling (foreground/background/killed), background tasks

## 6. complex — `06-walletish` (Fintech-flavored wallet demo)
- Biometric auth (expo-local-authentication)
- Deep linking / universal links
- Intro to native module bridging concepts (still Expo-managed)
- Multi-currency-style data modeling (parallel to evPay work)

## 7. complicated — `07-nativebridge` (Full native module + CI/CD)
- Expo prebuild → bare workflow
- Custom native module (Kotlin + Swift bridge) written by hand
- Offline-first sync layer
- CI/CD: GitHub Actions + Fastlane (you already know this from release eng.)
- Mirrors the ambition of RoamPulse, but in RN

## Working agreement
- I write the code + a DECISIONS.md per project explaining non-obvious choices.
- You read, then ask "why is this this and that is that" — I answer inline,
  and if the answer reveals a gap in DECISIONS.md, I update it.
- No skipping ahead on abstractions: each project only introduces what it needs.
