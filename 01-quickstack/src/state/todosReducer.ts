import { Todo } from '../types';

export type TodosState = Todo[];

export type TodosAction =
  | { type: 'add'; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string };

export function todosReducer(state: TodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case 'add':
      return [
        { id: String(Date.now()), title: action.title, done: false, createdAt: Date.now() },
        ...state,
      ];
    case 'toggle':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'remove':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}
