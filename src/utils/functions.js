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

export const camelToTitle = value => {
	const result = value.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};

export const flattenToSingleKeys = (obj, result = {}) => {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenToSingleKeys(value, result);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default debounce;