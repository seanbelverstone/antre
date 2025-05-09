import { useDispatch } from "react-redux";
import Button from "./Button";
import { setCharacterData } from "../redux/reducers/characterSlice";
import { Alert, Snackbar } from "@mui/material";
import { setSnackbar } from "../redux/reducers/snackbarSlice";

export const SaveButton = (props) => {
	const { customClassName, characterData, supabase } = props;

	const dispatch = useDispatch();

	const handleSave = async () => {
		dispatch(setCharacterData({
			id: characterData.id,
			charClass: characterData.charClass,
			name: characterData.name,
			race: characterData.race,
			stats: characterData.stats,
			items: characterData.items,
			gold: characterData.gold,
			level: characterData.level,
			pastLevels: characterData.pastLevels,
			user_id: characterData.user_id
		}))
		const { data, error } = await supabase
			.from('characters')
			.update({
				stats: characterData.stats,
				items: characterData.items,
				gold: characterData.gold,
				level: characterData.level,
				pastLevels: characterData.pastLevels
			})
			.eq('id', characterData.id);
		console.log(data);
		if (error) {
			dispatch(setSnackbar({
				openSnackbar: true,
				snackbarErrorMessage: error.message,
				snackbarSeverity: 'error'
			}))
		} else {
			dispatch(setSnackbar({
				openSnackbar: true,
				snackbarErrorMessage: 'Save successful!',
				snackbarSeverity: 'success'
			}))
		}
	}

	return (
		<Button text="Save Game" customClassName={customClassName} onClick={handleSave} />
	);
}