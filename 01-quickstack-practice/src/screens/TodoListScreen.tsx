import { FlatList, View, StyleSheet } from "react-native";
import { useTodos } from "../state/TodosContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function TodoListScreen ({navigation}:Props){

    const {todos} = useTodos();
    const renderItem = useCallback()


    return (
        <View style={styles.container}>
            <FlatList
                data= {todos}
                keyExtractor={(item) => item.id}
                renderItem = {renderItem}
                ListEmptyComponent={
                    <View style= {styles.empty}>
                        <Text style = {styles.emptyText}> No Todos yet, Add one below  </Text>
                    </View>                    
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'},
    empty: {padding:32, alignItems: 'center'},
    emptyText: {color :'#999'},
    addButton: {
        margin: 16,
        backgroundColor: '#2198f3',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff', fontWeight: '600', fontSize: 16
    }

});