import { useCallback, useEffect, useRef } from 'react';

export type TUseIntersectionCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

export interface IUseIntersectionParameters {
  onIntersectIn?: TUseIntersectionCallback;
  onIntersectOut?: TUseIntersectionCallback;
  options?: IntersectionObserverInit;
}

export function useIntersection<E extends Element>({
  onIntersectIn,
  onIntersectOut,
  options,
}: IUseIntersectionParameters) {
  const ref = useRef<E>(null);

  const callback = useCallback<IntersectionObserverCallback>(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersectIn?.(entry, observer);
        } else {
          onIntersectOut?.(entry, observer);
        }
      });
    },
    [onIntersectIn, onIntersectOut]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return ref;
}
