import { Todo } from "../type";



export type TodoState = Todo[];

export type TodosAction = 
| {type: 'add'; title: string}
| {type: 'toggle'; id: string}
| {type: 'remove'; id: string}

export function todosReducer(state: TodoState, action: TodosAction) {

    switch (action.type){
        case 'add':
            return [];
        case 'toggle':
            return state.map((t) => (t.id === action.id ? {...t , done: !t.completed} : t ));
        case 'remove':
            return state.filter((t) => t.id !== action.id);
        default :
            return state;

    }

}