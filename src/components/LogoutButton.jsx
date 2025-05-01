import { useState } from "react";
import Button from "./Button"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/reducers/userSlice";
import { clearCharacter } from "../redux/reducers/characterSlice";
import { useNavigate } from "react-router-dom";

export const LogoutButton = (props) => {
	const { type = 'logout', text } = props;
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	}

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (type === 'logout') {
			dispatch(logoutUser());
			navigate('/antreV2');
		}
		if (type === 'backToSelect') {
			dispatch(clearCharacter());
			navigate('/antreV2/select');
		}
	}

	return (
		<>
			<Button customClassName="logout" text={type === 'logout' ? 'Sign Out' : text} onClick={handleOpen}/>
			<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to ${type === 'backToSelect' ? 'go back to the character select screen?' :  'sign out?'} All unsaved progress will be lost.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} text="Cancel" customClassName="warning"/>
          <Button onClick={handleLogout} text={type === 'backToSelect' ? 'Go to Select' : "Sign Out"} customClassName="success"/>
        </DialogActions>
      </Dialog>
		</>
	);
}