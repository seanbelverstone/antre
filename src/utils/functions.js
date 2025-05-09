import { useCallback } from "react";
import { setSnackbar } from "../redux/reducers/snackbarSlice";

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

export const isBlacklistedChoice = (choice) => {
	switch (choice) {
	case '02-Tunnel':
	case '02-Tunnel Return Variant':
	case '03-Three Paths':
	case '13a-Wrong room':
	case '13aa-Wrong room':
	case '13b-Correct room':
	case '13bb-Correct room':
		return true;
	default: return false;
	}
};

export const handleModifierAlert = (dispatch, modifierObj) => {
	const modifierEntries = Object.entries(modifierObj);
	const messages = [];
	modifierEntries.forEach((mod) => {
		console.log(typeof mod[1]);
		switch (typeof mod[1]) {
			case 'string':
				messages.push(`You gained a ${mod[1]}. `)
				break;
			case 'number':
				if (mod[1] < 0) {
					const removedMinus = mod[1] * -1;
					messages.push(`You lost ${removedMinus} ${camelToTitle(mod[0])}. `)
				} else {
					messages.push(`You gained ${mod[1]} ${camelToTitle(mod[0])}. `)
				}
				break;
			default:
				messages.push(`You gained the ${mod[0]}. `)
		}
	})
	dispatch(setSnackbar({
		openSnackbar: true,
		snackbarErrorMessage: messages,
		snackbarSeverity: 'info'
	}))
}

export default debounce;