// WMO weather codes used by Open-Meteo: https://open-meteo.com/en/docs
const DESCRIPTIONS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  80: 'Rain showers',
  95: 'Thunderstorm',
};

export function describeWeatherCode(code: number): string {
  return DESCRIPTIONS[code] ?? 'Unknown conditions';
}
