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

/**
 * General Use Button
 *
 * @param {string} id
 * @param {string} type - can be anonSignIn, or anything else
 * @param {string} modalTitle - The title to dispay on the modal
 * @param {string} modalText - The text to display in the modal
 * @param {string} buttonClassName
 * @param {string} buttonText - The text to display inside the button
 * @param {Function} callback - What to execute when the modal is closed
 * @param {Boolean} disagreeText - Replaces the text on the Disagree modal button
 * @param {Boolean} agreeText - Replaces the text on the Agree modal button
 * @param {Component} htmlContent - You can pass HTML content in here to render instead of a string
 * @param {Boolean} onlyClose - defaults to false, pass in false if you want to hide the agree button
 */

export default function Modal(props) {
	const { id, type, modalTitle, modalText, buttonClassName, buttonText, callback, disagreeText, agreeText, htmlContent, onlyClose = false } = props;

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
				className="modal"
      >
        <DialogTitle id="alert-dialog-title">
          {modalTitle ?? 'Warning!'}
        </DialogTitle>
        <DialogContent>
					{htmlContent ? (
						htmlContent
					) : (
						<DialogContentText id="alert-dialog-description">
							{modalText ?? 'Are you sure you want to proceed?'}
						</DialogContentText>
					)}
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
				{onlyClose ? (
					<DialogActions>
						<Button customClassName="modalDisagree" onClick={() => handleClose('disagree')} text={disagreeText ?? "Disagree"} />
					</DialogActions>
				) : (
					<DialogActions>
						<Button customClassName="modalDisagree" onClick={() => handleClose('disagree')} text={disagreeText ?? "Disagree"} />
						<Button customClassName="modalAgree" onClick={() => handleClose('agree')} autoFocus disabled={type === 'anonSignIn' && !captchaToken} text={agreeText ?? "Agree"} />
					</DialogActions>
				)}
      </Dialog>
    </>
  );
}