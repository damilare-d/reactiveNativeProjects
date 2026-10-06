export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type RootStackParamList = {
  TodoList: undefined;
  AddTodo: undefined;
};
