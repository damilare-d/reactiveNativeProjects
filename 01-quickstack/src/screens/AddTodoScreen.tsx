import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTodos } from '../state/TodosContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTodo'>;

export default function AddTodoScreen({ navigation }: Props) {
  const { dispatch } = useTodos();
  const [title, setTitle] = useState('');

  const submit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch({ type: 'add', title: trimmed });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What needs doing?"
        value={title}
        onChangeText={setTitle}
        autoFocus
        onSubmitEditing={submit}
        returnKeyType="done"
      />
      <Pressable style={[styles.button, !title.trim() && styles.buttonDisabled]} onPress={submit} disabled={!title.trim()}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>

      <TextInput
        style={styles.input2}
        placeholder="What needs doing123?"
        value={title}
        onChangeText={setTitle}
        autoFocus
        onSubmitEditing={submit}
        returnKeyType="done"
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },

  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#90caf9' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
