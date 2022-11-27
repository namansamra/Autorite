import { current } from 'immer';
import { useEffect, useRef, useState } from 'react';

// delay is in seconds
let intervalId: any;
export const useSimplePolling = (
  callback: () => void,
  delay: number = 15,
  maxCalls: number = 4,
  stopPollingCallback: () => void = () => {}
) => {
  const savedCallback: any = useRef();
  const [calls, setCalls] = useState<number>(0);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isPolling) return;
    // subsequent calls with delay
    intervalId = setInterval(() => {
      setCalls((prevCalls) => prevCalls + 1);
      savedCallback?.current();
    }, delay * 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [delay, isPolling]);

  useEffect(() => {
    if (calls >= maxCalls) {
      stopPolling();
      stopPollingCallback();
    }
  }, [calls]);

  const stopPolling = () => {
    if (savedCallback) savedCallback.current = null;
    setCalls(0);
    setIsPolling(false);
    clearInterval(intervalId);
  };

  const startPolling = () => {
    setIsPolling(true);
  };

  return {
    startPolling,
    stopPolling,
  };
};
