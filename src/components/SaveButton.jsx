import { useDispatch } from "react-redux";
import Button from "./Button";
import { saveGame } from "../utils/functions";

export const SaveButton = (props) => {
	const { customClassName, characterData, supabase } = props;

	const dispatch = useDispatch();

	const handleSave = async () => {
		saveGame(dispatch, supabase, characterData)
	}

	return (
		<Button text="Save Game" customClassName={customClassName} onClick={handleSave} />
	);
}