import loadingImage from '../assets/images/AntreCrop.png';
import './css/Loader.css';

const Loader = (props) => {
	const { loading = false } = props;
	return (
		<div id="loadingWrapper" style={{
			...loading ? {
				display: 'flex'
			} : {
				display: 'none'
			}
		}}>
			<div>
				<img
					id="loader"
					src={loadingImage}
					alt="A rotating image of the game's icon to indicate loading"
				/>
			</div>
		</div>
	)
}

export default Loader;