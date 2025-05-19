import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
		openSnackbar: false,
		snackbarSeverity: 'error',
		snackbarErrorMessage: ''
	},
  reducers: {
    setSnackbar(state, action) {
			return {
				openSnackbar: action.payload.openSnackbar,
				snackbarSeverity: action.payload.snackbarSeverity ?? 'error',
				snackbarErrorMessage: action.payload.snackbarErrorMessage
			}
    }
  }
});

export const { setSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;