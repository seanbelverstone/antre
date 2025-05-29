import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterRow from '../components/CharacterRow';
import Button from '../components/Button.jsx';
import { LogoutButton } from '../components/LogoutButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { setCharacterData } from '../redux/reducers/characterSlice.js';
import './css/CharacterSelect.css';
import { setLoading } from '../redux/reducers/loaderSlice.js';
import { setSnackbar } from '../redux/reducers/snackbarSlice.js';
import { camelToTitle, timeToUnix } from '../utils/functions.js';
import Modal from '../components/Modal.jsx';

const CharacterSelectPage = (props) => {
	const { supabase } = props;
	const user = useSelector(state => state.user);
	const character = useSelector(state => state.character);
	const [characters, setCharacters] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (character?.id) {
			navigate('/play');
		}
	}, [character, navigate]);

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
			dispatch(setSnackbar({
				openSnackbar: true,
				snackbarErrorMessage: error.message,
				snackbarSeverity: 'error'
			}))
		}
		setCharacters(characters?.sort((a, b) => timeToUnix(a.created_at) > timeToUnix(b.created_at) ? 1 : -1));
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
			dispatch(setSnackbar({
				openSnackbar: true,
				snackbarErrorMessage: error.message,
				snackbarSeverity: 'error'
			}))
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
				<Modal modalTitle="Global Statistics" buttonText="Global Statistics" htmlContent={(
					<div>
						{Object.entries(user.userStatistics).map((stat, index) => {
							if (Object.entries(user.userStatistics)[index][0] === 'highestDamage') {
								return <p><span className="statKey">{camelToTitle(stat[0])}:</span> {`${stat[1]} dmg - ${camelToTitle(user.userStatistics.highestDamageWeapon)}`}</p>
							}
							if (Object.entries(user.userStatistics)[index][0] === 'highestEnemyDamage') {
								return <p><span className="statKey">{camelToTitle(stat[0])}:</span> {`${stat[1]} dmg - ${camelToTitle(user.userStatistics.highestEnemyDamageWeapon)}`}</p>
							}
							if (Object.entries(user.userStatistics)[index][0] === 'highestDamageWeapon' || Object.entries(user.userStatistics)[index][0] === 'highestEnemyDamageWeapon') {
								return;
							}
							return <p><span className="statKey">{camelToTitle(stat[0])}:</span> {stat[1]}</p>
						})
					}
					</div>
				)}/>
				{renderCharacters()}
				<section id="buttonsSection">
					{characters.length < 4 ? (
					<Link to="/create">
						<Button id="createCharacterButton" text="Create a Character" />
					</Link>
					) : <></>}
					<LogoutButton />
				</section>
			</section>
		</div>
	)
}


export default CharacterSelectPage;