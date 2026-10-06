export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;

}

export type RootStackParamList = {
    TodoList: undefined;
    AddTodo: undefined;
}