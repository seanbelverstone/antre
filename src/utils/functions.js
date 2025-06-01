import { useCallback } from "react";
import { setSnackbar } from "../redux/reducers/snackbarSlice";
import { setCharacterData } from "../redux/reducers/characterSlice";
import { updateUserStatistic } from "../redux/reducers/userSlice";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://tbwwbpochndpeltvsjxx.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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
	if (modifierEntries[0][0] === 'torchCheck' || modifierEntries[0][0] === 'luckCheck' || modifierEntries[0][0] === 'death' || modifierEntries[0][0] === 'fight') return;
	modifierEntries.forEach((mod) => {
		switch (typeof mod[1]) {
			case 'string':
				messages.push(`You ${mod[1] === 'none'? `lost your ${mod[0]} item.` : `gained a ${mod[1]}.`} `)
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
				mod[0] === 'torch' && mod[1] === false ? messages.push(`Your torch ran out.`) : messages.push(`You gained the ${mod[0]}. `)
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

  const wormFailure = '09caa-Worm Failure';
  const wormSuccess = '09cab-Worm Success';

  const slipToHang = '28baa-Gap Slip';
  const pullUpSlip = '28baaa-Gap Death';
  const hangPullUp = '28baab-Pull up';
  const gapSuccess = '28bab-Gap Success';

	const blindLizardDeath = '05bac-Lizard Death';
	const blindLizardSuccess = '05bad-Lizard Success';

	const blindLizardFireFight = '06ac-Another Lizard Fight'
	const blindLizardFireSuccess = '06ad-Fire Wisdom Success';

  // Story 1 is Dark path traps
  if (eventNumber === 1) {
    const targetNumber = 4;
    if (totalLuck <= targetNumber - 1) return deathLevel;
    else if (totalLuck <= targetNumber) return badLuckLevel;
    else return bestLuckLevel;

	// Story 2 is Worm Attack
  } else if (eventNumber === 2) {
    const targetNumber = 4;
    if (totalLuck <= targetNumber) return wormFailure;
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

	// Story 6 is the Blind Lizard hiding luck check
  } else if (eventNumber === 6) {
		const targetNumber = 3;
		if (totalLuck <= targetNumber) return blindLizardDeath;
    else return blindLizardSuccess;
	} else if (eventNumber === 7) {
		const targetNumber = 3;
		if (totalLuck <= targetNumber) return blindLizardFireFight;
		else return blindLizardFireSuccess;
	}
}

export const titleToCamel = (title) => {
  if (typeof title !== 'string' || !title) {
    return ''; // Handle empty or invalid input
  }
  const words = title.split(/[\s-]+/); // Split by spaces and dashes
  const firstWord = words.shift().toLowerCase(); // Remove and lowercase the first word
  const camelCaseTitle = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  return firstWord + camelCaseTitle;
}

export const camelToTitle = value => {
	const result = value.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};

export const toTitleCase = (str) => {
  if (typeof str !== 'string' || !str) {
    return '';
  }
  return str.split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const timeToUnix = (dateTime) => {
	return Math.floor(new Date(dateTime).getTime() / 1000);
}

/**
 * Update the user's statistics
 * Only call this function for highestDamage type if current damage value is higher than user.userStatistics.highestDamage
 *
 * @param {string} type - highestDamage, highestEnemyDamage, totalHealed, enemiesDefeated, wins, deaths
 * @param {Number} value - New value, only applicable to highestDamage, highestEnemyDamage, and totalHealed.
 * @param {string} weaponName - The name of the weapon, only applicable to highestDamage and highestEnemyDamage.
 * @param {Object} user - The user object from the Redux store.
 * @param {Function} dispatch - useDispatch() stored in const dispatch.
 */
export const handleUserStats = async (type, value, weaponName, user, dispatch) => {
	console.log(weaponName);
	let newValue;
	if (type === 'highestDamage' || type === 'highestEnemyDamage') {
		newValue = value;
	} else {
		const currentValue = isNaN(user.userStatistics[type]) ? 0 : user.userStatistics[type] ?? 0;
		console.log(type, currentValue, currentValue + value)
		newValue = type === 'totalHealed' ? currentValue + value : currentValue + 1;
	}
	const { error } = await supabase.auth.updateUser({
		data: {
			[type]: newValue,
			...type === 'highestDamage' && { highestDamageWeapon: weaponName },
			...type === 'highestEnemyDamage' && { highestEnemyDamageWeapon: weaponName }
		}
	});
	if (error) {
		dispatch(setSnackbar({
			openSnackbar: true,
			snackbarErrorMessage: error.message,
			snackbarSeverity: 'error'
		}))
		return;
	} else {
		if (type === 'highestDamage') {
			// We also want to record the weapon name that caused the damage
			dispatch(updateUserStatistic({
				field: 'highestDamageWeapon',
				value: weaponName
			}))
		}
		if (type === 'highestEnemyDamage') {
			dispatch(updateUserStatistic({
				field: 'highestEnemyDamageWeapon',
				value: weaponName
			}))
		}
		dispatch(updateUserStatistic({
			field: type,
			value: newValue
		}))
	}
}



export default debounce;