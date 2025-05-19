import { createSlice } from '@reduxjs/toolkit'

const characterData = createSlice({
  name: 'characterData',
	initialState: {
		id: null,
		charClass: '',
		name: '',
		race: '',
		stats: {
			strength: 0,
			wisdom: 0,
			defense: 0,
			luck: 0,
			health: 0,
		},
		items: {
			head: '',
			chest: '',
			hands: '',
			legs: '',
			torch: false,
			amulet: false,
			weapon: '',
			healthPotions: 0
		},
		gold: 0,
		level: '',
		pastLevels: [],
		user_id: null
	},
  reducers: {
    setCharacterData(state, action) {
			// sets the entire character object, should only be called when updating the entire object
      return {
				id: action.payload.id,
				charClass: action.payload.charClass,
				name: action.payload.name,
				race: action.payload.race,
				stats: action.payload.stats,
				items: action.payload.items,
				gold: action.payload.gold,
				level: action.payload.level,
				pastLevels: action.payload.pastLevels,
				user_id: action.payload.user_id
      }
    },
		updateCharacterField(state, action) {
			// updates a non-nested field, like gold/level/pastLevels etc
			const { field, value } = action.payload;
			state[field] = value;
		},
		updateStat(state, action) {
			// updates a single stat, like strength/wisdom
			const { statName, value } = action.payload;
			state.stats[statName] = value;
		},
		updateItem(state, action) {
			// updates a single stat, like strength/wisdom
			const { itemName, value } = action.payload;
			console.log('Item name: ', itemName, 'value: ', value)
			state.items[itemName] = value;
		},
		clearCharacter() {
			return null;
		}
  }
})

export const { setCharacterData, clearCharacter, updateCharacterField, updateStat, updateItem } = characterData.actions
export default characterData.reducer