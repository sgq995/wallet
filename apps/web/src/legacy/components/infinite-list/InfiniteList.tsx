import { CircularProgress, List, ListItem } from '@mui/material';
import { EffectCallback, ReactElement, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';

export interface IInfiniteListProps<
  TEntity = unknown,
  TEntityList = Array<TEntity>
> {
  list: TEntityList;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  onLoadMore: EffectCallback;
  children: (entity: TEntity) => ReactElement;
}

export const InfiniteList = <TEntity,>({
  list,
  isLoading,
  isFetching,
  hasNextPage,
  onLoadMore,
  children,
}: IInfiniteListProps<TEntity>) => {
  const [observerRef, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (hasNextPage && isIntersecting) {
      return onLoadMore();
    }
  }, [onLoadMore, isIntersecting, hasNextPage, isFetching]);

  return (
    <List>
      {list.map(children)}

      <ListItem ref={observerRef}></ListItem>

      <ListItem sx={{ justifyContent: 'center' }}>
        {isLoading && <CircularProgress />}
      </ListItem>
    </List>
  );
};
