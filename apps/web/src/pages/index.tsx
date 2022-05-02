import {
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import EntryPaper from '../components/EntryPaper';
import { Stack, Typography } from '../components/Material';

function useRefCallback<R>(
  callback: (ref: MutableRefObject<R>, element) => any
) {
  const ref = useRef<R>();
  const setRef = useCallback((element) => {
    console.log({ element });
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
    console.log({ observer });

    if (ref.current) {
      observer?.unobserve(ref.current);
    }

    if (element) {
      observer?.observe(element);
    }
  });

  return setRef;
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

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const firstRef = useObservedRef(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // setOffset(Math.max(offset - 1, 0));
        } else {
          setStart(Math.min(start + 1, data.length));
        }
      });
    },
    { threshold: 0.0 }
  );

  const lastRef = useObservedRef(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setEnd(Math.min(end + 1, data.length));
        }
      });
    },
    { threshold: 1.0 }
  );

  const elements = data
    .filter((_entry, index) => start <= index && index < end)
    .map((entry, index) => {
      const ref =
        index === start ? firstRef : index === end - 1 ? lastRef : undefined;
      return children(entry, ref, index);
    });

  return (
    <Stack spacing={2} ref={root.current}>
      {elements}
    </Stack>
  );
}

export default function Home() {
  const [entries, setEntries] = useState(new Array(50).fill({}));

  return (
    <>
      <Typography variant="h1">Home</Typography>

      <Stack spacing={2}>
        {/* {entries.map((_, index) => (
          <EntryPaper key={index} />
        ))} */}

        <InfiniteScroll data={entries}>
          {({}, ref, index) => <EntryPaper ref={ref} key={index} />}
        </InfiniteScroll>
      </Stack>
    </>
  );
}
