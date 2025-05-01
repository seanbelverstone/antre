import { useState } from "react";
import Button from "./Button"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
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
		dispatch(logoutUser());
		navigate('/antreV2');
	}

	return (
		<>
			<Button customClassName="logout" text="Sign Out" onClick={handleOpen}/>
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
            Are you sure you want to sign out? All unsaved progress will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} text="Cancel" customClassName="warning"/>
          <Button onClick={handleLogout} text="Sign Out" />
        </DialogActions>
      </Dialog>
		</>
	);
}