import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import '../css/Home.css';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/reducers/userSlice';
import Modal from '../Modal';

const Home = (props) => {
	const { callback, supabase } = props;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const signInAnonymously = async () => {
		const { data, error } = await supabase.auth.signInAnonymously()
		if (error) {
			// error message
		} else {
			console.log(data);
			dispatch(setUserData({
				id: data.user.id,
				email: data.user.email,
				access_token: data.session.access_token,
				expires_at: data.session.expires_at,
				expires_in: data.session.expires_in
			}));
			navigate('/antreV2/create');
		}
	}

	return (
		<div id="homeSection">
				<Modal
					type="anonSignIn"
					modalTitle="Warning"
					modalText="Starting a game without logging in won't save your progress, but you will get the option to create an account later."
					buttonClassName="homeButton"
					buttonText="Start"
					callback={signInAnonymously}
				/>
				{/* Start gives a popup that states: Starting a game without logging in won't save your progress,
					but you will get the option to create an account later. */}
				<Button customClassName="homeButton" text="Login" onClick={() => callback('login')}/>
				{/* Login fades out the buttons for email/password inputs */}
				<Button customClassName="homeButton" text="Sign Up" onClick={() => callback('signUp')}/>
				{/* Looks exactly the same as the signup page but login instea of create */}
		</div>
	)
}


export default Home;