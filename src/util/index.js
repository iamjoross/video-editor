import { useState, useRef, useCallback } from 'react';

export const useWait = () => {
  const [done, setDone] = useState(true);
  const timeout = useRef();
  const wait = useCallback((millis) => {
    clearTimeout(timeout.current);
    setDone(false);
    timeout.current = setTimeout(() => setDone(true), millis);
  }, []);
  return [wait, done];
};

export const snapToGrid = (x, y) => {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
};

export const formatDuration = (timestamp) => {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - (hours * 60);
  const seconds = timestamp % 60;
  const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

  return formatted;
};
