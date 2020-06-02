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

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
