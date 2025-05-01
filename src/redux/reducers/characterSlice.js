import { createSlice } from '@reduxjs/toolkit'

const characterData = createSlice({
  name: 'characterData',
  initialState: [],
  reducers: {
    setCharacterData(state, action) {
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
		clearCharacter() {
			return null;
		}
  }
})

export const { setCharacterData, clearCharacter } = characterData.actions
export default characterData.reducer