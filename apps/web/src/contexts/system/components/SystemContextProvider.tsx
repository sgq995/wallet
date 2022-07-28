import { PropsWithChildren } from 'react';
import { Backdrop, CircularProgress } from '../../../components/Material';

import { useSystemState } from '../state';
import { SystemContext } from '../SystemContext';

export default function SystemContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const { system, entryTypes, currencies } = useSystemState();

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.fab + 1 }}
        open={entryTypes.isLoading || currencies.isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <SystemContext.Provider value={system}>{children}</SystemContext.Provider>
    </>
  );
}
