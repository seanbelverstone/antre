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
					id="poppyLoader"
					src={loadingImage}
					alt="Poppy's loading head"
				/>
			</div>
		</div>
	)
}

export default Loader;