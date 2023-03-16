import { AppBar, Toolbar } from '@mui/material';
import { isNull } from 'lodash';
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

interface IPageContext {
  toolbarRef: RefObject<HTMLDivElement>;
}

const PageContext = createContext<IPageContext | null>(null);

function usePageContext() {
  const pageContext = useContext(PageContext);
  if (isNull(pageContext)) {
    throw new TypeError('Expected to be called inside a PageContext');
  }

  return pageContext;
}

export const PageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <PageContext.Provider value={{ toolbarRef }}>
      <AppBar position="sticky">
        <Toolbar ref={toolbarRef}></Toolbar>
      </AppBar>
      {children}
    </PageContext.Provider>
  );
};

export const PageToolbarPortal: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { toolbarRef } = usePageContext();

  return createPortal(children, toolbarRef.current!);
};
