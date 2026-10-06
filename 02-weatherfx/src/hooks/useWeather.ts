import { useEffect, useState } from 'react';
import { fetchWeather, geocodeCity } from '../api/weatherApi';
import { RequestState, WeatherSnapshot } from '../types';
import { useDebounce } from './useDebounce';

export function useWeather(cityQuery: string) {
  const debouncedQuery = useDebounce(cityQuery.trim(), 500);
  const [state, setState] = useState<RequestState<WeatherSnapshot>>({ status: 'idle' });

  useEffect(() => {
    if (!debouncedQuery) {
      setState({ status: 'idle' });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    (async () => {
      try {
        const places = await geocodeCity(debouncedQuery);
        if (cancelled) return;
        if (places.length === 0) {
          setState({ status: 'error', message: `No place found for "${debouncedQuery}"` });
          return;
        }
        const weather = await fetchWeather(places[0]);
        if (cancelled) return;
        setState({ status: 'success', data: weather });
      } catch (err) {
        if (cancelled) return;
        setState({ status: 'error', message: err instanceof Error ? err.message : 'Unknown error' });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return state;
}
