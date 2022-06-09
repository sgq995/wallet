import { PropsWithChildren, useEffect, useState } from 'react';
import AsyncViewer, {
  AsyncData,
  AsyncError,
  AsyncLoading,
} from '../../../components/AsyncViewer';
import { CircularProgress } from '../../../components/Material';
import { useFindAllQuery } from '../../../hooks/entry-types';
import { ISystemContext, SystemContext } from '../SystemContext';

export default function SystemContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [system, setSystem] = useState<ISystemContext>();

  const { isLoading, isError, data, error } = useFindAllQuery();

  useEffect(() => {
    if (data) {
      setSystem({ entryTypes: data.data });
    }
  }, [data]);

  return (
    <AsyncViewer isLoading={isLoading} isError={isError}>
      <AsyncLoading>
        <CircularProgress />
      </AsyncLoading>

      <AsyncError>{error?.message}</AsyncError>

      <AsyncData>
        <SystemContext.Provider value={system}>
          {children}
        </SystemContext.Provider>
      </AsyncData>
    </AsyncViewer>
  );
}
