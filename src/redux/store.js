import { configureStore } from '@reduxjs/toolkit'
import setUserData from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: setUserData
  }
})