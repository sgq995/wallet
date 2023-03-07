import { useCallback, useRef, useState } from 'react';

export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [(node: any) => void, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const lastIntersectionNode = useRef(null);
  const intersectionObserverRef = useRef<IntersectionObserver>(
    new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options)
  );

  const ref = useCallback((node) => {
    if (lastIntersectionNode.current) {
      intersectionObserverRef.current.unobserve(lastIntersectionNode.current);
      lastIntersectionNode.current = null;
    }

    if (node === null) {
      return;
    }

    lastIntersectionNode.current = node;
    intersectionObserverRef.current.observe(node);
  }, []);

  return [ref, isIntersecting];
}
