import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import storylines from '../utils/storylines.js';
import { flattenToSingleKeys } from '../utils/functions';
import Story from '../components/PlayComponents/Story.jsx';
import Combat from '../components/PlayComponents/Combat.jsx';
import './css/Play.css'
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '../components/Button.jsx';
import { LogoutButton } from '../components/LogoutButton.jsx';

const Play = () => {
	// const { supabase } = props;
	const character = useSelector(state => state.character);

	const [storyText, setStoryText] = useState('');
	const [typewriterDelay, setTypewriterDelay] = useState(20);
	const [currentLevelObject, setCurrentLevelObject] = useState({});
	const [pastLevels, setPastLevels] = useState([]);

	// Create save button that sends update to Supabase
	// handle stat increases within here, and pass the data down to Combat
	
	useEffect(() => {
		setCurrentLevelObject(storylines[character.level])
	}, [character.level])

	useEffect(() => {
		if (currentLevelObject?.name && !(pastLevels.includes(currentLevelObject.name))) {
			setPastLevels(prev => [...prev, currentLevelObject.name])
		}
	}, [currentLevelObject, pastLevels]);

	useEffect(() => {
		const characterFlattened = flattenToSingleKeys(character)
		// Replaces words in storylines.json that are wrapped in double
		// curly braces, like {{weapon}} for dynamic text
		if (currentLevelObject?.text) {
			const replacePlaceholders = (template, data) => {
				return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
					const trimmedKey = key.trim();
					return Object.prototype.hasOwnProperty.call(data, trimmedKey)
						? data[trimmedKey]
						: '';
				});
			}
			setStoryText(replacePlaceholders(currentLevelObject?.text, characterFlattened));
		}
	}, [character, currentLevelObject])

	useEffect(() => {
		if (currentLevelObject?.modifier && currentLevelObject.modifier.length > 0) {
			//handle modifier
		}
	})

	const handleChoiceSelect = (target) => {
		setCurrentLevelObject(storylines[target])
	}

	const handleTyperwriterSpeedChange = (event) => {
    setTypewriterDelay(event.target.value);
  };

	// TODO: Implement modifier changes
	// TODO: Implement chance rolls
	// TODO: Implement death screen
	// TODO: Inventory drawer
	// TODO: Save game

	return (
		<div id="playPage" className="page">
			<div id="speedDropdown">
				<InputLabel id="typewriterDropdownTextLabel">Text Speed</InputLabel>
				<Select
					labelId="typewriterDropdownTextLabel"
					id="typewriterDropdown"
					value={typewriterDelay}
					onChange={handleTyperwriterSpeedChange}
				>
					<MenuItem value={40}>Slow</MenuItem>
					<MenuItem value={20}>Medium</MenuItem>
					<MenuItem value={1}>Fast</MenuItem>
				</Select>
			</div>
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
				{currentLevelObject.modifier && currentLevelObject.modifier.some(mod => mod.fight) ? (
					<Combat currentLevelObject={currentLevelObject} />
					// Combat needs: character stats, modifiers, enemy name/weapon
					// after combat or story, update redux store?
				) : (
					<Story currentLevelObject={currentLevelObject} choiceSelect={handleChoiceSelect} pastLevels={pastLevels}/>
				)}
			</div>

			<Button text="Inventory" id="inventoryButton" />
			{/* Maybe put these 3 buttons in a modal or some kind of menu */}
			<Button text="Save Game" id="saveGame" disabled/>
			<LogoutButton type="backToSelect" text="Back to Character Select"/>
			<LogoutButton text="Sign Out" />
		</div>
	)
}


export default Play;