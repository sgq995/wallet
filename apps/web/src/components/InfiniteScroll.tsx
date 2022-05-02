import {
  MutableRefObject,
  PropsWithChildren,
  Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Stack } from './Material';

function useRefCallback<R>(
  callback: (ref: MutableRefObject<R>, element) => any
) {
  const ref = useRef<R>();
  const setRef = useCallback((element) => {
    callback(ref, element);
    ref.current = element;
  }, []);

  return setRef;
}

function useObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
): IntersectionObserver | undefined {
  const [observer, setObserver] = useState<IntersectionObserver>(
    new IntersectionObserver(callback, options)
  );

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
  }, []);

  return observer;
}

function useObservedRef<T extends HTMLElement = undefined>(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
) {
  const observer = useObserver(callback, options);

  const setRef = useRefCallback<T>((ref, element) => {
    if (ref.current) {
      observer?.unobserve(ref.current);
    }

    if (element) {
      observer?.observe(element);
    }
  });

  return setRef;
}

function ElementWrapper({ children }: PropsWithChildren<{}>) {
  return <>{children}</>;
}

interface InfiniteScrollProps<D, R extends HTMLElement = undefined> {
  data: D[];
  children: (entry: D, ref?: Ref<R>, index?: number) => JSX.Element;
}

function InfiniteScroll<D, R extends HTMLElement = undefined>({
  data,
  children,
}: InfiniteScrollProps<D, R>) {
  const root = useRef();

  const [isFirstIntersecting, setIsFirstIntersecting] = useState(false);
  const [isLastIntersecting, setIsLastIntersecting] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const firstRef = useObservedRef(
    (entries) => {
      entries.forEach((entry) => {
        setIsFirstIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          // setEnd((end) => Math.min(end - 1, data.length));
        } else {
          // setStart((start) => Math.min(start + 1, data.length));
        }
      });
    },
    { threshold: 0.0 }
  );

  const lastRef = useObservedRef(
    (entries) => {
      entries.forEach((entry) => {
        setIsLastIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          // setEnd((end) => Math.min(end + 1, data.length));
        } else {
          // setStart((start) => Math.max(start - 1, 0));
        }
      });
    },
    { threshold: 1.0 }
  );

  useLayoutEffect(() => {
    console.log({ isFirstIntersecting, isLastIntersecting });
  }, [isFirstIntersecting, isLastIntersecting]);

  const elements = data
    .map((entry, index) => {
      if (start <= index && index < end) {
        return { entry, key: index };
      }
    })
    .filter((result) => result);
  // .map((entry, index, array) => {
  //   const ref = undefined;
  //   return children(entry, ref, index);
  // });

  return (
    <Stack spacing={2} ref={root.current}>
      <span ref={firstRef}></span>
      {elements.map(({ entry, key }) => (
        <ElementWrapper key={key}>{children(entry)}</ElementWrapper>
      ))}
      <span ref={lastRef}></span>
    </Stack>
  );
}
