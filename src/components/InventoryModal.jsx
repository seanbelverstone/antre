import { useState } from 'react';
import Button from './Button.jsx'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function InventoryModal(props) {
	const { id, customClassName, character } = props;
  const [open, setOpen] = useState(false);
	console.log(open);
  return (
    <>
      <Button id={id} customClassName={customClassName} onClick={() => setOpen(!open)} text="Inventory" />
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
					{`${character.name}'s Inventory`}
        </DialogTitle>
				<DialogActions>
          <Button customClassName="modalDisagree" onClick={() => setOpen(!open)} text="X" />
        </DialogActions>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            {'Are you sure you want to proceed?'}
          </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </>
  );
}