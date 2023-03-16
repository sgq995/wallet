import { AppBar, Toolbar } from '@mui/material';
import { PropsWithChildren, useRef } from 'react';
import { PageContext } from './page-context';

export const PageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <PageContext.Provider value={{ toolbarRef }}>
      <AppBar position="sticky">
        <Toolbar ref={toolbarRef} />
      </AppBar>
      {children}
    </PageContext.Provider>
  );
};
