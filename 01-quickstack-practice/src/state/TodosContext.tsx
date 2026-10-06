import { createContext, useContext } from "react";
import { TodosAction, TodoState } from "./todosREducer";


type TodosContextValue = {
    todos: TodoState,
    dispatch: React.Dispatch<TodosAction>;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export function useTodos (){
    const ctx = useContext(TodosContext);
    if (!ctx) throw new Error('useTodos must be within a TodosProvider');
    return ctx;
}