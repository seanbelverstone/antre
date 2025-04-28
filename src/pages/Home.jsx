import { Link, useNavigate } from 'react-router-dom';
import antreLogo from '../assets/images/AntreCrop.png';
import Button from '../components/Button';
import './css/Home.css'

const HomePage = () => {
	let navigate = useNavigate();

	const popupAndGo = () => {
		alert(`Starting a game without logging in won't save your progress, but you will get the option to create an account later.`)
		navigate('/combat');
	}
	return (
		<div id="homePage" className="page">
			<img id="mainLogo" src={antreLogo} />
			<div id="startLoginRow" className="row">
				<Button className="btn" text="Start" onClick={popupAndGo}/>
				{/* Start gives a popup that states: Starting a game without logging in won't save your progress,
					but you will get the option to create an account later. */}
				<Link to="/login">
					<Button className="btn" text="Login" />
				</Link>
				{/* Login fades out the buttons for email/password inputs */}
			</div>
			<div id="signUpRow" className="row">
				<Button className="btn" text="Sign Up" />
				{/* Looks exactly the same as the signup page but login instea of create */}
			</div>
		</div>
	)
}


export default HomePage;