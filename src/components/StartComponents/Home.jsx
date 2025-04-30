import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import '../css/Home.css';



const Home = (props) => {
	const { callback } = props;
	let navigate = useNavigate();

	const popupAndGo = () => {
		alert(`Starting a game without logging in won't save your progress, but you will get the option to create an account later.`)
		navigate('/combat');
	}

	return (
		<div id="homeSection">
				<Button className="homeButton" text="Start" onClick={popupAndGo}/>
				{/* Start gives a popup that states: Starting a game without logging in won't save your progress,
					but you will get the option to create an account later. */}
				<Button className="homeButton" text="Login" onClick={() => callback('login')}/>
				{/* Login fades out the buttons for email/password inputs */}
				<Button className="homeButton" text="Sign Up" onClick={() => callback('signUp')}/>
				{/* Looks exactly the same as the signup page but login instea of create */}
		</div>
	)
}


export default Home;