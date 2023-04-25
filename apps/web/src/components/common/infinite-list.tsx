import { List, ListItem } from '@mui/material';
import { PropsWithChildren, useCallback } from 'react';
import { useIntersection } from '../../hooks/use-intersection';

export interface IInfiniteListProps {
  onBottomReached?: () => void;
}

export const InfiniteList: React.FC<PropsWithChildren<IInfiniteListProps>> = ({
  onBottomReached,
  children,
}) => {
  const handleIntersectIn = useCallback(() => {
    onBottomReached?.();
  }, [onBottomReached]);

  const ref = useIntersection<HTMLLIElement>({
    onIntersectIn: handleIntersectIn,
  });

  return (
    <List>
      {children}

      <ListItem ref={ref} disablePadding />
    </List>
  );
};
