import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/reducers/userSlice";
import { clearCharacter } from "../redux/reducers/characterSlice";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

/**
 * Logout Button
 *
 * @param {string} type - backToSelect/logout
 * @param {string} text
 */

export const LogoutButton = (props) => {
	const { type = 'logout', text, customClassName } = props;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (type === 'logout') {
			dispatch(logoutUser());
			navigate('/');
		}
		if (type === 'backToSelect') {
			navigate('/select');
		}
		dispatch(clearCharacter());
	}

	return (
		<Modal
			buttonClassName={`logoutButton${customClassName ? ` ${customClassName}` : ''}`}
			modalText={`Are you sure you want to ${type === 'backToSelect' ? 'go back to the character select screen?' :  'sign out?'} All unsaved progress will be lost.`}
			buttonText={type === 'logout' ? 'Sign Out' : text}
			callback={handleLogout}
			disagreeText="Cancel"
			agreeText={type === 'backToSelect' ? 'Go to Select' : "Sign Out"}
		/>
	);
}