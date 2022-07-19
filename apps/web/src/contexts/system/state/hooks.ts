import { Dispatch, useEffect, useReducer } from 'react';
import { UseQueryResult } from 'react-query';

import { useFindAllQuery as useFindAllCurrencies } from '../../../hooks/currencies';
import { useFindAllQuery as useFindAllEntryTypes } from '../../../hooks/entry-types';

import { defaultSystemContext } from '../SystemContext';

import { ISystemAction, SystemAction } from './actions';
import { systemReducer } from './reducer';

function useDataQuery<TData = unknown, TError = unknown>(
  type: SystemAction,
  dispatch: Dispatch<ISystemAction>,
  useQueryAll: () => UseQueryResult<TData, TError>
) {
  const { isLoading, data: response } = useQueryAll();

  useEffect(() => {
    if (response) {
      dispatch({
        type,
        payload: (response as any).data,
      });
    }
  }, [response]);

  return { isLoading };
}

export function useEntryTypesQuery(dispatch: Dispatch<ISystemAction>) {
  return useDataQuery(
    SystemAction.UpdateEntryTypes,
    dispatch,
    useFindAllEntryTypes
  );
}

export function useCurrenciesQuery(dispatch: Dispatch<ISystemAction>) {
  return useDataQuery(
    SystemAction.UpdateCurrencies,
    dispatch,
    useFindAllCurrencies
  );
}

export function useSystemState() {
  const [system, dispatch] = useReducer(systemReducer, defaultSystemContext);

  const { isLoading: isEntryTypesLoading } = useEntryTypesQuery(dispatch);
  const { isLoading: isCurrenciesLoading } = useCurrenciesQuery(dispatch);

  return {
    system,
    entryTypes: { isLoading: isEntryTypesLoading },
    currencies: { isLoading: isCurrenciesLoading },
  };
}
