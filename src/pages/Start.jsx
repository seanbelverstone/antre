import { useState } from 'react';
import antreLogo from '../assets/images/AntreCrop.png';
import LoginSignUp from '../components/StartComponents/LoginSignUp.jsx';
import Home from '../components/StartComponents/Home.jsx';
import './css/Start.css'

const Start = (props) => {
	const { supabase } = props;

	const [pageType, setPageType] = useState('home')

	return (
		<div id="startPage" className="page">
			<img id="mainLogo" src={antreLogo} />
			<div id="selectionArea">
				{pageType === 'home' ? (
					<Home callback={setPageType} supabase={supabase}/>
				) : (
					<LoginSignUp callback={setPageType} type={pageType} supabase={supabase}/>
				)}
			</div>
		</div>
	)
}


export default Start;