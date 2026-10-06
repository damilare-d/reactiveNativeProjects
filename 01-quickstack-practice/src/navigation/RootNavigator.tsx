import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import AddTodoScreen from '../screens/AddTodoScreen';
import TodoListScreen from '../screens/TodoListScreen';


const nav = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator (){

    return (
        <nav.Navigator>
            <nav.Screen name= "TodoList" component = {TodoListScreen}/>
            <nav.Screen name = "AddTodo" component = {AddTodoScreen}/>
        </nav.Navigator>

    );
    
}