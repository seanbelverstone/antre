import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CharacterRow from '../components/CharacterRow';

const CharacterSelectPage = (props) => {
	const { supabase } = props;
	const user = useSelector(state => state.user);
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		getCharacters();
	}, [])

	const getCharacters = async () => {
		console.log('user_id', user.id);
		const { data: characters, error } = await supabase
		.from('characters')
		.select('*')
		console.log(characters, error);
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
		<>
			<div>Character Select Page</div>
			<section id="allCharacters">
				{renderCharacters()}
			</section>
				<Link to="/">
					<button className="btn">Home</button>
				</Link>
		</>
	)
}


export default CharacterSelectPage;