import { createSlice } from '@reduxjs/toolkit'

const userData = createSlice({
  name: 'userData',
  initialState: [],
  reducers: {
    setUserData(state, action) {
			console.log(state, action)
      return {
        id: action.payload.id,
        email: action.payload.email,
        accessToken: action.payload.access_token,
				expiresAt: action.payload.expires_at,
				expiresIn: action.payload.expires_in
      }
    },
		logoutUser() {
			return null;
		}
  }
})

export const { setUserData, logoutUser } = userData.actions
export default userData.reducer