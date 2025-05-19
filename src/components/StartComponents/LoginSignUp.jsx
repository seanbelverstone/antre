import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../Button';
import TextField from '@mui/material/TextField';
import { useDebouncedValidator } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha'
import '../css/LoginSignUp.css';
import { setSnackbar } from '../../redux/reducers/snackbarSlice';

const captchaKey = import.meta.env.VITE_CAPTCHA_KEY;

const LoginSignUp = (props) => {
	const { type, callback, supabase } = props;
	//  -- EMAIL -- 
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailHelperText, setEmailHelperText] = useState('');
	//  -- PASSWORD -- 
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHelperText, setPasswordHelperText] = useState('');
	//  -- CONFIRM PASSWORD --
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');

	const [isFormValid, setIsFormValid] = useState(false);

	const [captchaToken, setCaptchaToken] = useState()

	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.id) {
			navigate('/antre/select');
		}
	}, [user, navigate]);
	
	// -- VALIDATION
	const validateEmail = (email) => {
		const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	};

	const validatePassword = (password) => {
		const reg = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
		return reg.test(password); // returns true if invalid
	}
	
	const debouncedValidateEmail = useDebouncedValidator((value) => {
		const valid = validateEmail(value);
		setEmailError(!valid);
		setEmailHelperText(!valid ? 'Please enter a valid email' : '');
	}, 300, []);
	
	const debouncedValidatePassword = useDebouncedValidator((value) => {
		const valid = validatePassword(value);
		setPasswordError(valid);
		setPasswordHelperText(
			valid
				? 'Password must be at least 8 characters, include upper/lowercase and a number.'
				: ''
		);
	}, 300, []);
	
	const debouncedValidateConfirmPassword = useDebouncedValidator((value) => {
		const match = value === password;
		setConfirmPasswordError(!match);
		setConfirmPasswordHelperText(!match ? 'Passwords must match' : '');
	}, 300, [password]);

	const fields = useMemo(() => [
		{ value: email, validate: debouncedValidateEmail },
		{ value: password, validate: debouncedValidatePassword },
		{ value: confirmPassword, validate: debouncedValidateConfirmPassword },
	], [
		email,
		password,
		confirmPassword,
		debouncedValidateEmail,
		debouncedValidatePassword,
		debouncedValidateConfirmPassword
	]);

	useEffect(() => {
		fields.forEach(({ value, validate }) => {
			if (value) validate(value);
		});
	}, [fields]);

	// -- Checking Global Validation

	const anyFieldsEmpty = [email, password, confirmPassword].some(value => value.trim() === '');

	useEffect(() => {
		if (type === 'signUp') {
			if (emailError || passwordError || confirmPasswordError || anyFieldsEmpty || !captchaToken) {
				setIsFormValid(false)
			} else {
				setIsFormValid(true);
			}
		}
		if (type === 'login') {
			const loginValid = !([email, password].some(value => value.trim() === '')) && !emailError
			setIsFormValid(loginValid);
		}

	}, [email, emailError, password, passwordError, confirmPasswordError, anyFieldsEmpty, type, captchaToken])

	const dispatch = useDispatch();

	const handleUser = async (event) => {
		event.preventDefault();
		const { data, error } = type === 'login'
			? await supabase.auth.signInWithPassword({
					email,
					password
				})
			: await supabase.auth.signUp({
				email,
				password,
				options: { captchaToken }
			})
		if (data.session === null) {
			dispatch(setSnackbar({
				openSnackbar: true,
				snackbarErrorMessage: error.message,
				snackbarSeverity: 'error'
			}))
		} else {
			dispatch(setUserData({
				id: data.user.id,
				email: data.user.email,
				access_token: data.session.access_token,
				expires_at: data.session.expires_at,
				expires_in: data.session.expires_in
			}));
			dispatch(setSnackbar({
				openSnackbar: true,
				snackbarErrorMessage: type === 'login' ? 'Login successful!' : 'Sign up successful!',
				snackbarSeverity: 'success'
			}))
		}
		type === 'signUp' && captcha.current.resetCaptcha()
	}
	const captcha = useRef()

	return (
		<form id="loginSignUpForm" onSubmit={handleUser}>
			<TextField
				className="outlined-basic"
				label="Email"
				variant="outlined"
				onChange={event => setEmail(event.target.value)}
				error={emailError}
				helperText={emailHelperText}
			/>
			<TextField
				className="outlined-basic"
				label="Password"
				variant="outlined"
				type="password"
				onChange={event => setPassword(event.target.value)}
				error={type === 'login' ? false : passwordError}
				helperText={type === 'login' ? false : passwordHelperText}
			/>
			{type === 'signUp' && (
				<>
					<TextField
						className="outlined-basic"
						label="Confirm Password"
						variant="outlined"
						type="password"
						onChange={event => setConfirmPassword(event.target.value)}
						error={confirmPasswordError}
						helperText={confirmPasswordHelperText} />
					<HCaptcha
						ref={captcha}
						sitekey={captchaKey}
						onVerify={(token) => { setCaptchaToken(token);} }
					/>
				</>
			)}

			<Button id="loginSignUpButton" text={`${type === 'login' ? 'Login' : 'Sign Up'}`} disabled={!isFormValid} onClick={e => handleUser(e)}/>
			<Button id="goBackButton" text="Go Back" onClick={() => callback('home')} />
		</form>
	)
}


export default LoginSignUp;