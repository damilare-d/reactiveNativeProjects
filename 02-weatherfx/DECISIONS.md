# DECISIONS — 02-weatherfx

## 1. No Context this time — each screen owns its own fetch state
Project 1 used Context because multiple screens needed to read/mutate the *same*
collection. Here, Weather and Forex are two independent, screen-scoped concerns —
neither needs the other's data, and nothing outside a screen needs to read it. So each
screen just calls its own hook (`useWeather`, `useForex`) and keeps the result local
via `useState` inside that hook. Reaching for Context/a global store here would be
the "aim for a data-flow diagram before you have two features that need it" mistake —
the same premature-abstraction trap as introducing a repository interface in Flutter
before you have a second implementation to swap in.

## 2. `RequestState<T>` discriminated union instead of separate booleans
Compare this to the tempting alternative:
```ts
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<T | null>(null);
```
That allows *impossible states* — e.g. `loading: true` and `data` simultaneously set,
or `error` and `data` both present. A discriminated union makes those states
unrepresentable: you can only be in exactly one of `idle | loading | success | error`
at a time, and TypeScript narrows `data`/`message` to only exist on the branch where
they're valid (see the `switch` in `RequestStateView.tsx` — no `data!` non-null
assertions needed anywhere). This is the direct TS equivalent of a Dart sealed class /
freezed union used for Bloc states — same motivation, different syntax.

## 3. The API layer (`src/api/`) returns typed data, not raw `fetch` responses
`weatherApi.ts` and `forexApi.ts` are the only files that know these REST APIs exist —
they parse untyped JSON (note the `any` casts, contained here and nowhere else) and
hand back a `GeoResult`/`WeatherSnapshot`/`ForexRates`. No screen or hook ever touches
`fetch` or raw JSON directly. This is the repository-layer discipline from Clean
Architecture: swapping Open-Meteo for another weather provider later means editing one
file, not hunting through every screen that happened to call `fetch`.

## 4. Debounce lives in different places for Weather vs. Forex, on purpose
`useWeather` debounces internally — the hook owns "don't fetch on every keystroke"
as part of its contract. `useForex` does not debounce internally; `ForexScreen` debounces
the input itself before calling the hook. Neither is "more correct" — it's a
demonstration that debounce is a policy decision, not something a data-fetching hook
must always own. Put it in the hook when every caller should get the same debounce
behavior "for free"; put it in the caller when different call sites might reasonably
want different delays (or none).

## 5. `RequestStateView<T>` — a generic component, not a copy-pasted one per screen
Both screens need identical "show a spinner / show an error / show the idle hint /
otherwise render success" logic. Making the component generic (`<T,>`) rather than
writing `WeatherStateView` and `ForexStateView` separately means the loading/error/
idle branches exist in exactly one place. The cost: the success case has to be handed
in as a render function (`renderSuccess: (data: T) => ReactNode`) since the component
itself can't know how to draw a `WeatherSnapshot` vs. a `ForexRates`. This "render prop"
pattern is RN/React's version of passing a `Widget Function(T data) builder` into a
generic Flutter widget.

## 6. Bottom tabs, not a stack, for the root navigator
Weather and Forex are peer destinations a user jumps between freely, not a
linear drill-down flow — bottom tabs communicate that model correctly (persistent,
always-visible switch between top-level sections), same as choosing a
`BottomNavigationBar` over pushing routes in Flutter for equivalent peer screens.
Project 1's `AddTodo` was a *drill-down* action (push, do a thing, come back) — that's
what a stack is for. Different navigation shape for a different relationship between
screens, not an upgrade from project 1's stack.

## 7. Two free, keyless REST APIs
Open-Meteo (weather + geocoding) and open.er-api.com (forex) require no API key and no
signup. Deliberate — this project is about the *fetch/loading/error/typed-response*
pattern, not about secrets management or rate-limit handling. API keys and safely
storing them show up once auth is introduced in project 4.
