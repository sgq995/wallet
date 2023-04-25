import { Grid } from '@mui/material';
import React, { PropsWithChildren, useCallback } from 'react';
import { useIntersection } from '../../hooks/use-intersection';

export interface IInfiniteGrid {
  onBottomReached?: () => void;
}

export const InfiniteGrid: React.FC<PropsWithChildren<IInfiniteGrid>> = ({
  onBottomReached,
  children,
}) => {
  const handleIntersectIn = useCallback(() => {
    onBottomReached?.();
  }, [onBottomReached]);

  const ref = useIntersection<HTMLDivElement>({
    onIntersectIn: handleIntersectIn,
  });

  return (
    <Grid container>
      {children}

      <Grid ref={ref} component="div" item xs={12} />
    </Grid>
  );
};
