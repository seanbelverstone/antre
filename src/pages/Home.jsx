import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<>
			<div>Home Page</div>
				<Link to="/login">
					<button className="btn">Login</button>
				</Link>
				<Link to="/select">
					<button className="btn">Character Select</button>
				</Link>
				<Link to="/combat">
					<button className="btn">Combat</button>
				</Link>
		</>
	)
}

export default HomePage;