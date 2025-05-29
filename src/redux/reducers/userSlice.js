import { createSlice } from '@reduxjs/toolkit'

const userData = createSlice({
  name: 'userData',
  initialState: [{
		id: null,
		email: null,
		accessToken: null,
		expiresAt: null,
		expiresIn: null,
		textSpeed: 20,
		userStatistics: {
			highestDamage: 0,
			enemiesDefeated: 0,
			deaths: 0,
			wins: 0
		}
	}],
  reducers: {
    setUserData(state, action) {
      return {
        id: action.payload.id,
        email: action.payload.email,
        accessToken: action.payload.access_token,
				expiresAt: action.payload.expires_at,
				expiresIn: action.payload.expires_in,
				textSpeed: action.payload.textSpeed
      }
    },
		updateUserField(state, action) {
			// updates a non-nested field, like gold/level/pastLevels etc
			const { field, value } = action.payload;
			state[field] = value;
		},
		logoutUser() {
			return null;
		}
  }
})

export const { setUserData, updateUserField, logoutUser } = userData.actions
export default userData.reducer