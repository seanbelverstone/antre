import { Link } from 'react-router-dom';

const LoginPage = () => {
	return (
		<>
			<div>Home Page</div>
				<Link to="/">
					<button className="btn">Home</button>
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


export default LoginPage;