import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CharacterRow from '../components/CharacterRow';
import Button from '../components/Button.jsx';
import './css/CharacterSelect.css';
import { LogoutButton } from '../components/LogoutButton.jsx';

const CharacterSelectPage = (props) => {
	const { supabase } = props;
	const user = useSelector(state => state.user);
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		getCharacters();
	}, [])

	const getCharacters = async () => {
		const { data: characters, error } = await supabase
		.from('characters')
		.select('*')
		.eq('user_id', user.id)
		if (characters.length > 0) {
			setCharacters(characters);
		} else if (error) {
			console.log('oops ran into an error')
		} else {
			console.log('new account')
		}
	}

	const renderCharacters = () => {
		return characters.map(character => {
			return <CharacterRow character={character} key={character.id} />;
		});
	};

	return (
		<div className="page">
			<section id="allCharacters">
				{renderCharacters()}
				{characters.length < 4 ? (
					<Button id="createCharacterButton" text="Create a Character" />
				) : <></>}
				<LogoutButton />
			</section>
		</div>
	)
}


export default CharacterSelectPage;