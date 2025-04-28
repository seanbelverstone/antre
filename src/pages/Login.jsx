import { Link } from 'react-router-dom';
import antreLogo from '../assets/images/AntreCrop.png';
import Button from '../components/Button';
import './css/Login.css'

const LoginPage = () => {
	return (
		<div id="loginPage" className="page">
			<img id="mainLogo" src={antreLogo} />
			<div id="startLoginRow" className="row">
				<Button className="btn" text="Start" />
				{/* Start gives a popup that states: Starting a game without logging in won't save your progress,
					but you will get the option to create an account later. */}
				<Button className="btn" text="Login" />
				{/* Login fades out the buttons for email/password inputs */}
			</div>
			<div id="signUpRow" className="row">
				<Button className="btn" text="Sign Up" />
				{/* Looks exactly the same as the signup page but login instea of create */}
			</div>
		</div>
	)
}


export default LoginPage;