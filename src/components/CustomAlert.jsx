import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../redux/reducers/snackbarSlice";

export const CustomAlert = (props) => {
	const { openSnackbar, snackbarSeverity, snackbarErrorMessage } = props;
	const dispatch = useDispatch();

	console.log(openSnackbar, snackbarSeverity, snackbarErrorMessage);
	useEffect(() => {
		if (openSnackbar) {
			setTimeout(() => {
				dispatch(setSnackbar({
					openSnackbar: false,
					snackbarSeverity,
					snackbarErrorMessage
				}))
			}, 3000)
		}
	}, [openSnackbar, dispatch, snackbarErrorMessage, snackbarSeverity])
	return (
		<>
			<Snackbar
					open={openSnackbar}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
				>
				<Alert
					severity={snackbarSeverity}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{snackbarErrorMessage}
				</Alert>
			</Snackbar>
		</>
	);
}