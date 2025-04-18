import { useEffect, useRef, useState } from "react";

type UseInterval = <T, U>(
  callback: (vars?: U) => T,
  delay: number | null
) => void;

export const useInterval: UseInterval = (callback, delay) => {
  const callbackRef = useRef<typeof callback | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const useVisibilityChange = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsVisible(!document.hidden);
    
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      console.log("Visibility changed:", document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export const usePolling = (callback: () => void, delay: number | null) => {
  const [pollingInterval, setPollingInterval] = useState<number | null>(delay);
  const isPageVisible = useVisibilityChange();
  useEffect(() => {
    if (isPageVisible) {
      setPollingInterval(delay);
    } else {
      setPollingInterval(null);
    }
  }, [isPageVisible]);

  useInterval(() => {
    callback();
  }, pollingInterval);
};
