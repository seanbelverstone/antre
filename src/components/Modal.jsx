import { useRef, useState } from 'react';
import Button from './Button.jsx'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './css/Modal.css'
const captchaKey = import.meta.env.VITE_CAPTCHA_KEY;


export default function Modal(props) {
	const { id, type, title, text, buttonClassName, buttonText, callback } = props;

  const [open, setOpen] = useState(false);
	const [captchaToken, setCaptchaToken] = useState()

	const captcha = useRef()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirm) => {
		if (confirm === 'agree') {
			callback && callback();
		}
    setOpen(false);
  };

  return (
    <>
      <Button id={id} customClassName={buttonClassName} onClick={handleClickOpen} text={buttonText} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title ?? 'Warning!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text ?? 'Are you sure you want to proceed?'}
          </DialogContentText>
        </DialogContent>
				{type === 'anonSignIn' && (
					<div id="captchaSection">
						<HCaptcha
							ref={captcha}
							sitekey={captchaKey}
							onVerify={(token) => { setCaptchaToken(token);} }
						/>
						</div>
				)}
        <DialogActions>
          <Button onClick={() => handleClose('disagree')} text="Disagree" />
          <Button onClick={() => handleClose('agree')} autoFocus disabled={type === 'anonSignIn' && !captchaToken} text="Agree" />
        </DialogActions>
      </Dialog>
    </>
  );
}