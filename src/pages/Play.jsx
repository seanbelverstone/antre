import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import storylines from '../utils/storylines.js';
import { flattenToSingleKeys } from '../utils/functions';
import Story from '../components/PlayComponents/Story.jsx';
import Combat from '../components/PlayComponents/Combat.jsx';
import './css/Play.css'
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '../components/Button.jsx';
import { LogoutButton } from '../components/LogoutButton.jsx';
import { updateCharacterField, updateItem, updateStat } from '../redux/reducers/characterSlice.js';
import { classDefaultValues } from '../utils/damageCalculations.js';

const Play = () => {
	const character = useSelector(state => state.character);
	const dispatch = useDispatch();

	const [storyText, setStoryText] = useState('');
	const [typewriterDelay, setTypewriterDelay] = useState(20);
	const [currentLevelObject, setCurrentLevelObject] = useState({});
	const [pastLevels, setPastLevels] = useState([]);
	const [appliedModifiers, setAppliedModifiers] = useState([]); // ← NEW STATE

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
		if (
			currentLevelObject?.modifier &&
			currentLevelObject?.name &&
			!appliedModifiers.includes(currentLevelObject.name)
		) {
			const getModifierHandlers = () => {
				const statNames = ['strength', 'defense', 'wisdom', 'luck'];
				const itemNames = ['head', 'chest', 'hands', 'legs', 'torch', 'amulet', 'weapon', 'healthPotions'];
				const handlers = {
					gold: (value) =>
						dispatch(
							updateCharacterField({
								field: 'gold',
								value: character.gold + value
							})
						),
					health: (value) => {
						const overMaximum = character.stats.health + value > classDefaultValues[character.charClass];
						dispatch(
							updateCharacterField({
								field: 'health',
								value: overMaximum ? classDefaultValues[character.charClass] : character.stats.health + value
							})
						)
					},
					end: console.log('handle end'), // TODO: Handle end, probably do nothing
					death: console.log('u died lol') // TODO: Handle death
				};
				// dynamically updates stats
				statNames.forEach((stat) => {
					handlers[stat] = (value) =>
						dispatch(
							updateStat({
								statName: stat,
								value: character.stats[stat] + value,
							})
						);
				});
				// dynamically updates items
				itemNames.forEach((item) => {
					console.log(item);
					handlers[item] = (value) =>
						dispatch(
							updateItem({
								itemName: item,
								value: item === 'healthPotions' ? character.items[item] + value : value
							})
						);
				});
				return handlers;
			};

			const modifierHandlers = getModifierHandlers();

			for (const [modType, modValue] of Object.entries(currentLevelObject.modifier)) {
				const handler = modifierHandlers[modType];
				if (handler) {
					handler(modValue);
				} else {
					console.warn('Unknown modifier:', modType);
				}
			}
			setAppliedModifiers((prev) => [...prev, currentLevelObject.name]);
		}
	}, [currentLevelObject, appliedModifiers, character, dispatch]);

	const handleChoiceSelect = (target) => {
		setCurrentLevelObject(storylines[target])
	}

	const handleTyperwriterSpeedChange = (event) => {
		setTypewriterDelay(event.target.value);
	};

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
				{currentLevelObject.modifier && currentLevelObject?.modifier?.fight ? (
					<Combat currentLevelObject={currentLevelObject} />
				) : (
					<Story
						currentLevelObject={currentLevelObject}
						choiceSelect={handleChoiceSelect}
						pastLevels={pastLevels}
					/>
				)}
			</div>

			<Button text="Inventory" id="inventoryButton" />
			<Button text="Save Game" id="saveGame" disabled />
			<LogoutButton type="backToSelect" text="Back to Character Select" />
			<LogoutButton text="Sign Out" />
		</div>
	)
}

export default Play;
