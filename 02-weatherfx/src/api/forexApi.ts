import { ForexRates } from '../types';

const RATES_URL = 'https://open.er-api.com/v6/latest';

export async function fetchRates(base: string): Promise<ForexRates> {
  const res = await fetch(`${RATES_URL}/${encodeURIComponent(base)}`);
  if (!res.ok) throw new Error(`Forex fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.result !== 'success') throw new Error(json['error-type'] ?? 'Unknown forex error');
  return {
    base: json.base_code,
    rates: json.rates,
    fetchedAt: Date.now(),
  };
}
