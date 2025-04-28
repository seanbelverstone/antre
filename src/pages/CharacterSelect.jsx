import { Link } from 'react-router-dom';

const CharacterSelectPage = () => {
	return (
		<>
			<div>Character Select Page</div>
				<Link to="/">
					<button className="btn">Home</button>
				</Link>
				<Link to="/login">
					<button className="btn">Login</button>
				</Link>
				<Link to="/combat">
					<button className="btn">Combat</button>
				</Link>
		</>
	)
}


export default CharacterSelectPage;