import { configureStore } from '@reduxjs/toolkit'
import userData from './reducers/userSlice';
import characterData from './reducers/characterSlice';
import loaderReducer from './reducers/loaderSlice';
import snackbarReducer from './reducers/snackbarSlice';

export const store = configureStore({
  reducer: {
    user: userData,
		character: characterData,
		loader: loaderReducer,
		snackbar: snackbarReducer
  }
})