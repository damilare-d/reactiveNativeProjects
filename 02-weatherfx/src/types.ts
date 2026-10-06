export type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export type GeoResult = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type WeatherSnapshot = {
  place: GeoResult;
  temperatureC: number;
  windKph: number;
  weatherCode: number;
};

export type ForexRates = {
  base: string;
  rates: Record<string, number>;
  fetchedAt: number;
};

export type TabParamList = {
  Weather: undefined;
  Forex: undefined;
};
