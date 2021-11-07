import { useEffect, useState } from "react";

const useResizeObserver = (
  componentWindow?: HTMLElement | null,
  callback?: ResizeObserverCallback
): void => {
  const [resizeObserver, setResizeObserver] = useState<ResizeObserver>();

  useEffect(() => {
    if (!resizeObserver && callback) {
      setResizeObserver(new ResizeObserver(callback));
    }
  }, [callback, resizeObserver]);

  useEffect(() => {
    if (componentWindow instanceof HTMLElement) {
      resizeObserver?.observe(componentWindow);
    }

    return () => {
      if (componentWindow instanceof HTMLElement) {
        resizeObserver?.unobserve(componentWindow);
      }
    };
  }, [componentWindow, resizeObserver]);
};

export default useResizeObserver;
