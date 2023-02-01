import { HttpError } from '@wallet/utilities/http.utility';
import { useQuery } from 'react-query';
import { CurrencyService, TCurrencyResponse } from '../../services';
import { CURRENCIES_KEY } from './currencies.key';

export function useCurrencies() {
  return useQuery<TCurrencyResponse, HttpError>(
    [CURRENCIES_KEY],
    () => CurrencyService.find(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
}
