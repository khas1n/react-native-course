import { useState, useEffect, useRef } from "react";

export function useCountDown(idx: number, initialCount = -1) {
  const intervalRef = useRef<number>();
  const [countDown, setCountDown] = useState(initialCount);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    if (idx === -1) {
      return;
    }

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          return count - 1;
        });
      }, 50);
    }

    return cleanup;
  }, [idx, isRunning]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (countDown === 0) {
      cleanup();
    }
  }, [countDown]);

  const cleanup = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      setRunning(false);
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? initialCount);
      setRunning(true);
    },
  };
}
