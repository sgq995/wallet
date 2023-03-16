import { isNull } from 'lodash';
import { createContext, RefObject, useContext } from 'react';

export interface IPageContext {
  toolbarRef: RefObject<HTMLDivElement>;
}

export const PageContext = createContext<IPageContext | null>(null);

export function usePageContext() {
  const pageContext = useContext(PageContext);
  if (isNull(pageContext)) {
    throw new TypeError('Expected to be called inside a PageContext');
  }

  return pageContext;
}
