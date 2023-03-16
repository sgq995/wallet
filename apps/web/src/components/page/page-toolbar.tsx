import { isNull } from 'lodash';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePageContext } from './page-context';

export const PageToolbar: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { toolbarRef } = usePageContext();
  const [container, setContainer] = useState(toolbarRef.current);

  useEffect(() => {
    setContainer(toolbarRef.current);
  }, [toolbarRef.current]);

  if (isNull(container)) {
    return null;
  }

  return createPortal(children, container);
};
