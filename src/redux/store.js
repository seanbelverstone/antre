import { configureStore } from '@reduxjs/toolkit'
import userData from './reducers/userSlice';
import characterData from './reducers/characterSlice';

export const store = configureStore({
  reducer: {
    user: userData,
		character: characterData
  }
})