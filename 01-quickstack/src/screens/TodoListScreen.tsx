import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import TodoItem from '../components/TodoItem';
import { useTodos } from '../state/TodosContext';
import { RootStackParamList, Todo } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoList'>;

export default function TodoListScreen({ navigation }: Props) {
  const { todos, dispatch } = useTodos();

  const onToggle = useCallback((id: string) => dispatch({ type: 'toggle', id }), [dispatch]);
  const onRemove = useCallback((id: string) => dispatch({ type: 'remove', id }), [dispatch]);
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => <TodoItem todo={item} onToggle={onToggle} onRemove={onRemove} />,
    [onToggle, onRemove]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No todos yet. Add one below.</Text>
          </View>
        }
      />
      <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddTodo')}>
        <Text style={styles.addButtonText}>+ Add Todo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create      ({
  container: { flex: 1, backgroundColor: '#fff' },
  empty: { padding: 32, alignItems: 'center' },
  emptyText: { color: '#999' },
  addButton: {
    margin: 16,
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
