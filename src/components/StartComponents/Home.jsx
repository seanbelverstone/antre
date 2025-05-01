import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import '../css/Home.css';



const Home = (props) => {
	const { callback } = props;
	let navigate = useNavigate();

	const popupAndGo = () => {
		alert(`Starting a game without logging in won't save your progress, but you will get the option to create an account later.`)
		navigate('/antreV2/combat');
	}

	return (
		<div id="homeSection">
				<Button newClassName="homeButton" text="Start" onClick={popupAndGo}/>
				{/* Start gives a popup that states: Starting a game without logging in won't save your progress,
					but you will get the option to create an account later. */}
				<Button newClassName="homeButton" text="Login" onClick={() => callback('login')}/>
				{/* Login fades out the buttons for email/password inputs */}
				<Button newClassName="homeButton" text="Sign Up" onClick={() => callback('signUp')}/>
				{/* Looks exactly the same as the signup page but login instea of create */}
		</div>
	)
}


export default Home;