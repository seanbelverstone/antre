import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterRow from '../components/CharacterRow';
import Button from '../components/Button.jsx';
import { LogoutButton } from '../components/LogoutButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { setCharacterData } from '../redux/reducers/characterSlice.js';
import { Alert, Snackbar } from '@mui/material';
import './css/CharacterSelect.css';
import { setLoading } from '../redux/reducers/loaderSlice.js';

const CharacterSelectPage = (props) => {
	const { supabase } = props;
	const user = useSelector(state => state.user);
	const character = useSelector(state => state.character);
	const [characters, setCharacters] = useState([]);
	const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState('error')

	const navigate = useNavigate();

	useEffect(() => {
		if (character?.id) {
			navigate('/antre/combat');
		}
	}, [character, navigate]);

	window.onbeforeunload = function () {
		return false;
	}

	const dispatch = useDispatch();

	const getCharacters = useCallback(async () => {
		// TODO: on load, check if user_id exists, if not throw a warning then go back to homepage
		dispatch(setLoading({ loading: true }));
		const { data: characters, error } = await supabase
		.from('characters')
		.select('*')
		.eq('user_id', user.id)
		console.log(characters);
		if (error) {
			setOpenSnackbar(true);
			setSnackbarErrorMessage(error.message)
			setSnackbarSeverity('error');
		}
		setCharacters(characters);
		dispatch(setLoading({ loading: false }));
	}, [supabase, user, dispatch])
	
	useEffect(() => {
		getCharacters();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

	const deleteThisCharacter = async (charId) => {
		const { error } = await supabase
			.from('characters')
			.delete()
			.eq('id', charId)
		if (error) {
			setOpenSnackbar(true);
			setSnackbarErrorMessage(error.message)
			setSnackbarSeverity('error');
		} else {
			getCharacters();
		}
	}

	const renderCharacters = () => {
		return characters.map(character => {
			return <CharacterRow character={character} key={character.id} playThisCharacter={playThisCharacter} deleteThisCharacter={deleteThisCharacter}/>;
		});
	};

	return (
		<div className="page" id="characterSelectPage">
			<section id="allCharacters">
				{renderCharacters()}
				<section id="buttonsSection">
					{characters.length < 4 ? (
					<Link to="/antre/create">
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
					severity={snackbarSeverity}
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