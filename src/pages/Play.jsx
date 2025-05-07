import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import storylines from '../utils/storylines.js';

import './css/Play.css'
import { flattenToSingleKeys } from '../utils/functions';

const Play = () => {
	// const { supabase } = props;
	const character = useSelector(state => state.character);

	const [storyText, setStoryText] = useState('');
	const [typewriterDelay, setTypewriterDelay] = useState(20);
	const [currentLevel, setCurrentLevel] = useState('');
	// Get character level on page load
	// create pastLevels array
	// store current level in state
	// if the story object's modifier is fight, show combat buttons, otherwise show Story buttons
	// Create save button that sends update to Supabase
	
	useEffect(() => {
		setCurrentLevel(storylines[character.level])
	}, [character.level])

	useEffect(() => {
		const characterFlattened = flattenToSingleKeys(character)
		// Replaces words in storylines.json that are wrapped in double
		// curly braces, like {{weapon}} for dynamic text
		console.log(character.level);
		console.log(storylines[`${character.level}`]);
		if (currentLevel !== '') {
			const replacePlaceholders = (template, data) => {
				return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
					const trimmedKey = key.trim();
					return Object.prototype.hasOwnProperty.call(data, trimmedKey)
						? data[trimmedKey]
						: '';
				});
			}
			setStoryText(replacePlaceholders(currentLevel?.text, characterFlattened));
		}
	}, [character, currentLevel])

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