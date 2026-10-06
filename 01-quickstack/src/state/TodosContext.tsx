import React, { createContext, useContext, useReducer } from 'react';
import { TodosAction, TodosState, todosReducer } from './todosReducer';

type TodosContextValue = {
  todos: TodosState;
  dispatch: React.Dispatch<TodosAction>;
};

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return <TodosContext.Provider value={{ todos, dispatch }}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used within a TodosProvider');
  return ctx;
}
