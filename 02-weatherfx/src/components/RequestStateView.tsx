import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RequestState } from '../types';

type Props<T> = {
  state: RequestState<T>;
  idleLabel: string;
  renderSuccess: (data: T) => React.ReactNode;
};

export default function RequestStateView<T>({ state, idleLabel, renderSuccess }: Props<T>) {
  switch (state.status) {
    case 'idle':
      return (
        <View style={styles.center}>
          <Text style={styles.muted}>{idleLabel}</Text>
        </View>
      );
    case 'loading':
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      );
    case 'error':
      return (
        <View style={styles.center}>
          <Text style={styles.error}>{state.message}</Text>
        </View>
      );
    case 'success':
      return <>{renderSuccess(state.data)}</>;
  }
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  muted: { color: '#999' },
  error: { color: '#e53935', textAlign: 'center' },
});
