import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import RequestStateView from '../components/RequestStateView';
import { useWeather } from '../hooks/useWeather';
import { WeatherSnapshot } from '../types';
import { describeWeatherCode } from '../utils/weatherCodes';

export default function WeatherScreen() {
  const [query, setQuery] = useState('');
  const state = useWeather(query);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search a city (e.g. Lagos)"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="words"
        returnKeyType="search"
      />
      <RequestStateView
        state={state}
        idleLabel="Type a city name to see current weather"
        renderSuccess={(data: WeatherSnapshot) => (
          <View style={styles.card}>
            <Text style={styles.place}>
              {data.place.name}{data.place.country ? `, ${data.place.country}` : ''}
            </Text>
            <Text style={styles.temp}>{Math.round(data.temperatureC)}°C</Text>
            <Text style={styles.condition}>{describeWeatherCode(data.weatherCode)}</Text>
            <Text style={styles.wind}>Wind: {Math.round(data.windKph)} km/h</Text>
          </View>
        )}
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
  card: { alignItems: 'center', paddingTop: 32, gap: 8 },
  place: { fontSize: 20, fontWeight: '600' },
  temp: { fontSize: 48, fontWeight: '700' },
  condition: { fontSize: 16, color: '#555' },
  wind: { fontSize: 14, color: '#888' },
});
