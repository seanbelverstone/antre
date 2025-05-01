import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterRow from '../components/CharacterRow';
import Button from '../components/Button.jsx';
import { LogoutButton } from '../components/LogoutButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { setCharacterData } from '../redux/reducers/characterSlice.js';
import { Alert, Snackbar } from '@mui/material';
import './css/CharacterSelect.css';

const CharacterSelectPage = (props) => {
	const { supabase } = props;
	const user = useSelector(state => state.user);
	const character = useSelector(state => state.character);
	const [characters, setCharacters] = useState([]);
	const [snackbarErrorMessage, setSnackbarErrorMessage] = useState();
	const [openSnackbar, setOpenSnackbar] = useState();

	const navigate = useNavigate();
	useEffect(() => {
		if (character?.id) {
			navigate('/antreV2/combat');
		}
	}, [character, navigate]);

	window.onbeforeunload = function () {
		return false;
	}

	const getCharacters = useCallback(async () => {
		const { data: characters, error } = await supabase
		.from('characters')
		.select('*')
		.eq('user_id', user.id)
		if (characters?.length > 0) {
			setCharacters(characters);
		} else if (error) {
			setOpenSnackbar(true);
			setSnackbarErrorMessage(error.message)
		}
		// otherwise, it's a new account
	}, [supabase, user])
	
	useEffect(() => {
		getCharacters();
	}, [getCharacters])

	const dispatch = useDispatch();

	const playThisCharacter = (char) => {
		dispatch(setCharacterData({
			id: char.id,
			charClass: char.charClass,
			name: char.name,
			race: char.race,
			stats: char.stats,
			items: char.items,
			gold: char.gold,
			level: char.level,
			pastLevels: char.pastLevels,
			user_id: char.user_id
		}));

	}

	const renderCharacters = () => {
		return characters.map(character => {
			return <CharacterRow character={character} key={character.id} playThisCharacter={playThisCharacter}/>;
		});
	};

	return (
		<div className="page" id="characterSelectPage">
			<section id="allCharacters">
				{renderCharacters()}
				<section id="buttonsSection">
					{characters.length < 4 ? (
					<Link to="/antreV2/create">
						<Button id="createCharacterButton" text="Create a Character" />
					</Link>
					) : <></>}
					<LogoutButton />
				</section>
			</section>
			<Snackbar
					open={openSnackbar}
					autoHideDuration={5000}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
				>
					<Alert
						severity="error"
						variant="filled"
						sx={{ width: '100%' }}
					>
						{snackbarErrorMessage}
					</Alert>
				</Snackbar>
		</div>
	)
}


export default CharacterSelectPage;