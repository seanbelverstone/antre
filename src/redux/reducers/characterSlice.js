import { createSlice } from '@reduxjs/toolkit'

const characterData = createSlice({
  name: 'characterData',
  initialState: [],
  reducers: {
    setCharacterData(state, action) {
			// sets the entire character object, should only be called once on initialization
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
			// updates a non-nested field, like items/gold/level etc
			const { field, value } = action.payload;
			state[field] = value;
		},
		updateStat(state, action) {
			// updates a single stat, like strength/wisdom
			const { statName, value } = action.payload;
			state.stats[statName] = value;
		},
		clearCharacter() {
			return null;
		}
  }
})

export const { setCharacterData, clearCharacter, updateCharacterField, updateStat } = characterData.actions
export default characterData.reducer