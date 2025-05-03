import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import storylines from '../utils/storylines.json';

import './css/Play.css'
import { flattenToSingleKeys } from '../utils/functions';

const Play = () => {
	// const { supabase } = props;
	const character = useSelector(state => state.character);
	const [storyText, setStoryText] = useState('');
	const [typewriterDelay, setTypewriterDelay] = useState(20);

	useEffect(() => {
		const characterFlattened = flattenToSingleKeys(character)

		const replacePlaceholders = (template, data) => {
			return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
				const trimmedKey = key.trim();
				return Object.prototype.hasOwnProperty.call(data, trimmedKey)
					? data[trimmedKey]
					: '';
			});
		}

		setStoryText(replacePlaceholders(storylines[0].text, characterFlattened));
	}, [character])


	return (
		<div id="playPage" className="page">
			<div id="storyTextArea">
				<Typewriter
					options={{
						strings: storyText,
						autoStart: true,
						loop: false,
						delay: typewriterDelay,
						wrapperClassName: 'text'
					}}
				/>
			</div>
		</div>
	)
}


export default Play;