import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Todo } from '../types';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.titleArea} onPress={() => onToggle(todo.id)}>
        <View style={[styles.checkbox, todo.done && styles.checkboxDone]} />
        <Text style={[styles.title, todo.done && styles.titleDone]} numberOfLines={2}>
          {todo.title}
        </Text>
      </Pressable>
      <Pressable onPress={() => onRemove(todo.id)} hitSlop={12}>
        <Text style={styles.remove}>Remove</Text>
      </Pressable>
    </View>
  );
}

export default React.memo(TodoItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#888',
  },
  checkboxDone: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  remove: {
    color: '#e53935',
    fontSize: 14,
  },
});
