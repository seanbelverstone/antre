import { useCallback } from "react";
import { setSnackbar } from "../redux/reducers/snackbarSlice";
import { setCharacterData } from "../redux/reducers/characterSlice";

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

export const diceRoll = () => (Math.floor(Math.random() * 6) + 1)

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
	console.log(modifierEntries);
	const messages = [];
	if (modifierEntries[0][0] === 'torchCheck' || modifierEntries[0][0] === 'luckCheck' || modifierEntries[0][0] === 'death') return;
	modifierEntries.forEach((mod) => {
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

export const saveGame = async (dispatch, supabase, characterData) => {
	dispatch(setCharacterData({
		id: characterData.id,
		charClass: characterData.charClass,
		name: characterData.name,
		race: characterData.race,
		stats: characterData.stats,
		items: characterData.items,
		gold: characterData.gold,
		level: characterData.level,
		pastLevels: characterData.pastLevels,
		user_id: characterData.user_id
	}))
	const { data, error } = await supabase
		.from('characters')
		.update({
			stats: characterData.stats,
			items: characterData.items,
			gold: characterData.gold,
			level: characterData.level,
			pastLevels: characterData.pastLevels
		})
		.eq('id', characterData.id);
	console.log(data);
	if (error) {
		dispatch(setSnackbar({
			openSnackbar: true,
			snackbarErrorMessage: error.message,
			snackbarSeverity: 'error'
		}))
	} else {
		dispatch(setSnackbar({
			openSnackbar: true,
			snackbarErrorMessage: 'Save successful!',
			snackbarSeverity: 'success'
		}))
	}
}

export const campaignLuckCheck = (luck, eventNumber) => {
	console.log('Player luck: ', luck, 'Event Number: ', eventNumber)
  let userLuckModifier = luck / 2;
  let myRoll = diceRoll();
  let totalLuck = Math.floor(myRoll + userLuckModifier);
	console.log(userLuckModifier, myRoll, totalLuck)
  const deathLevel = '04bab-Death';
  const badLuckLevel = '04bac-Bad Luck';
  const bestLuckLevel = '04bad-Best Luck';

  const wormDeath = '09caa-Worm Death';
  const wormSuccess = '09cab-Worm Success';

  const slipToHang = '28baa-Gap Slip';
  const pullUpSlip = '28baaa-Gap Death';
  const hangPullUp = '28baab-Pull up';
  const gapSuccess = '28bab-Gap Success';

  // Story 1 is Dark path traps
  if (eventNumber === 1) {
    const targetNumber = 4;
    if (totalLuck <= targetNumber - 1) return deathLevel;
    else if (totalLuck <= targetNumber) return badLuckLevel;
    else return bestLuckLevel;

	// Story 2 is Worm Attack
  } else if (eventNumber === 2) {
    const targetNumber = 4;
    if (totalLuck <= targetNumber) return wormDeath;
    else return wormSuccess;

	// Story 3 is Gap cross, with weapon
  } else if (eventNumber === 3) {
    const targetNumber = 4;
    if (totalLuck <= targetNumber) return slipToHang;
    else return gapSuccess;

	// Story 4 is Gap cross, but after slipping first
  } else if (eventNumber === 4) {
    const targetNumber = 3;
    if (totalLuck <= targetNumber - 1) return pullUpSlip;
		else return hangPullUp;
    
	// Story 5 is Gap cross, but after throwing weapon over. Luck chances are increased
  } else if (eventNumber === 5) {
    const targetNumber = 5;
    if (totalLuck <= targetNumber - 2) return slipToHang;
    else return gapSuccess;
  }
}


export default debounce;