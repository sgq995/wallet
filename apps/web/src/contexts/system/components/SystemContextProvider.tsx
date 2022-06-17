import { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { Backdrop, CircularProgress } from '../../../components/Material';
import { useFindAllQuery as useEntryTypesFindAllQuery } from '../../../hooks/entry-types';
import {
  defaultSystemContext,
  ISystemContext,
  SystemContext,
} from '../SystemContext';

enum SystemAction {
  UpdateEntryTypes,
}

interface ISystemAction {
  type: SystemAction;
  payload: any;
}

function systemReducer(state: ISystemContext, action: ISystemAction) {
  switch (action.type) {
    case SystemAction.UpdateEntryTypes:
      return { ...state, entryTypes: action.payload };

    default:
      throw Error(`Unknown system action ${action.type}`);
  }
}

export default function SystemContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [system, dispatch] = useReducer(systemReducer, defaultSystemContext);

  const {
    isLoading: isEntryTypesLoading,
    isError: isEntryTypesError,
    data: entryTypesData,
    error: entryTypesError,
  } = useEntryTypesFindAllQuery();

  useEffect(() => {
    if (entryTypesData) {
      dispatch({
        type: SystemAction.UpdateEntryTypes,
        payload: entryTypesData.data,
      });
    }
  }, [entryTypesData]);

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.fab + 1 }}
        open={isEntryTypesLoading}
      >
        <CircularProgress />
      </Backdrop>
      <SystemContext.Provider value={system}>{children}</SystemContext.Provider>
    </>
  );
}
