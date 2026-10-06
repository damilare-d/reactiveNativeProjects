import { useEffect, useState } from 'react';
import { fetchRates } from '../api/forexApi';
import { ForexRates, RequestState } from '../types';

export function useForex(base: string) {
  const [state, setState] = useState<RequestState<ForexRates>>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    fetchRates(base)
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({ status: 'error', message: err instanceof Error ? err.message : 'Unknown error' });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [base]);

  return state;
}
