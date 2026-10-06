import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import RequestStateView from '../components/RequestStateView';
import { useDebounce } from '../hooks/useDebounce';
import { useForex } from '../hooks/useForex';
import { ForexRates } from '../types';

const WATCHLIST = ['EUR', 'GBP', 'NGN', 'JPY', 'CAD', 'AUD', 'ZAR', 'GHS'];

export default function ForexScreen() {
  const [baseInput, setBaseInput] = useState('USD');
  const debouncedBase = useDebounce(baseInput.trim().toUpperCase(), 500);
  const state = useForex(debouncedBase || 'USD');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Base currency (e.g. USD)"
        value={baseInput}
        onChangeText={setBaseInput}
        autoCapitalize="characters"
        maxLength={3}
      />
      <RequestStateView
        state={state}
        idleLabel="Enter a 3-letter currency code"
        renderSuccess={(data: ForexRates) => <RatesList data={data} />}
      />
    </View>
  );
}

function RatesList({ data }: { data: ForexRates }) {
  const rows = useMemo(
    () => WATCHLIST.filter((code) => code in data.rates).map((code) => ({ code, rate: data.rates[code] })),
    [data]
  );

  return (
    <FlatList
      data={rows}
      keyExtractor={(item) => item.code}
      ListHeaderComponent={<Text style={styles.header}>1 {data.base} equals</Text>}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.code}>{item.code}</Text>
          <Text style={styles.rate}>{item.rate.toFixed(4)}</Text>
        </View>
      )}
    />
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
  header: { fontSize: 14, color: '#888', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  code: { fontSize: 16, fontWeight: '600' },
  rate: { fontSize: 16 },
});
