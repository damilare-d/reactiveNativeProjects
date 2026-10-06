# DECISIONS — 01-quickstack

Short-lived ADRs for the choices that aren't obvious from reading the code once.
Flutter comparisons are given where they shorten the explanation.

## 1. useReducer + Context, not useState scattered across screens
Todos are a single collection mutated by three distinct actions (add/toggle/remove).
`useReducer` names those actions explicitly (`{ type: 'toggle', id }`) instead of
scattering `setTodos(todos.map(...))` calls across components — same reasoning as
using a Bloc's events instead of ad-hoc `setState` calls in Flutter. Context exists
only to make the `{ todos, dispatch }` pair reachable from any screen without prop
drilling through the navigator — it is NOT a general state-management recommendation.
For anything bigger than one feature's local state, project 4 moves to Zustand
(closer to Riverpod/Bloc in ergonomics: selectors, no provider-tree re-render issue).

## 2. Why Context here will start to hurt, and that's intentional
Every dispatch triggers a re-render of every component reading `useTodos()`, because
Context has no built-in selector mechanism (unlike Riverpod's `select` or Bloc's
`buildWhen`). With one screen and a short list this is invisible. It stops being fine
around project 3-4's list sizes — that's the motivating pain that justifies picking
up a real state library later rather than a "best practice" asserted up front.

## 3. React.memo on TodoItem
`renderItem` is memoized with `useCallback` in TodoListScreen, but that alone doesn't
stop TodoItem from re-rendering when its parent list re-renders unless the item
component itself is also memoized. `React.memo` + stable callback props
(`useCallback`) together are what make FlatList rows skip re-render when their own
`todo` prop hasn't changed — analogous to how a `const` Flutter widget skips rebuild
when nothing in its subtree changed.

## 4. Native stack navigator, not JS-based stack
`@react-navigation/native-stack` renders using each platform's real navigation
controller (UINavigationController / Fragment) instead of re-implementing transitions
in JS. It's the RN-standard default now — better performance and native gesture
handling than the older `@react-navigation/stack`. Flutter equivalent: this is closer
to using platform page transitions vs. hand-rolled `PageRouteBuilder` animations.

## 5. AddTodo as a `presentation: 'modal'` screen, not a dialog component
Keeps navigation state (and back button / gesture dismissal) owned by the navigator
instead of local boolean visibility flags. One state model for "what's on screen"
rather than two (navigator stack + a modal-visible flag).

## 6. No persistence yet
Todos live only in memory (lost on reload). Deliberate — AsyncStorage/SQLite is
project 3's subject. Introducing persistence here would blur what's being taught at
each step.
