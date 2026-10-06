import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { TodosProvider } from './src/state/TodosContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <TodosProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TodosProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
