import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddTodoScreen from '../screens/AddTodoScreen';
import TodoListScreen from '../screens/TodoListScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Quickstack' }} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: 'New Todo', presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
