import { GeoResult, WeatherSnapshot } from '../types';

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function geocodeCity(query: string): Promise<GeoResult[]> {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
  const json = await res.json();
  const results = json.results ?? [];
  return results.map((r: any) => ({
    id: r.id,
    name: r.name,
    country: r.country ?? '',
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export async function fetchWeather(place: GeoResult): Promise<WeatherSnapshot> {
  const url = `${FORECAST_URL}?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast failed: ${res.status}`);
  const json = await res.json();
  return {
    place,
    temperatureC: json.current.temperature_2m,
    windKph: json.current.wind_speed_10m,
    weatherCode: json.current.weather_code,
  };
}
