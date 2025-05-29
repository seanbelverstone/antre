import { createSlice } from '@reduxjs/toolkit'

const userData = createSlice({
  name: 'userData',
  initialState: [{
		id: null,
		email: null,
		accessToken: null,
		expiresAt: null,
		expiresIn: null,
		textSpeed: 20
		
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
		updateTextSpeed(state, action) {
			state.textSpeed = action.payload.textSpeed
		},
		logoutUser() {
			return null;
		}
  }
})

export const { setUserData, updateTextSpeed, logoutUser } = userData.actions
export default userData.reducer