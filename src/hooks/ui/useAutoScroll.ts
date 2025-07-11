import { useCallback, useEffect, useRef } from 'react';

export function useAutoScroll() {
  const observerRef = useRef<MutationObserver | null>(null);

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  const scrollTo = useCallback(
    (id: string, options?: ScrollIntoViewOptions) => {
      const scrollIfExists = () => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            ...options,
          });

          return true;
        }

        return false;
      };

      if (scrollIfExists()) return;

      const observer = new MutationObserver(() => {
        if (scrollIfExists()) {
          disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      observerRef.current = observer;

      // Disconnect observer after 10 seconds
      setTimeout(disconnect, 10000);
    },
    [disconnect]
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { scrollTo };
}
