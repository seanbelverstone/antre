import { useCallback } from "react";

export function useDebouncedValidator(fn, delay = 300, deps = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(fn, delay), deps);
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export default debounce;