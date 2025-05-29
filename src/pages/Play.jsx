import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import storylines from '../utils/storylines.js';
import { campaignLuckCheck, flattenToSingleKeys, handleModifierAlert, handleUserStats, isBlacklistedChoice, saveGame } from '../utils/functions';
import Story from '../components/PlayComponents/Story.jsx';
import Combat from '../components/PlayComponents/Combat.jsx';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { LogoutButton } from '../components/LogoutButton.jsx';
import { updateCharacterField, updateItem, updateStat } from '../redux/reducers/characterSlice.js';
import { classDefaultValues } from '../utils/damageCalculations.js';
import MenuDrawer from '../components/PlayComponents/MenuDrawer.jsx';
import { updateUserField } from '../redux/reducers/userSlice.js';
import { setSnackbar } from '../redux/reducers/snackbarSlice.js';
import './css/Play.css'
import PinnedInventory from '../components/PinnedInventory.jsx';

const Play = ({ supabase }) => {
	const user = useSelector(state => state.user);
	const character = useSelector(state => state.character);
	const dispatch = useDispatch();

	const [storyText, setStoryText] = useState('');
	const [typewriterDelay, setTypewriterDelay] = useState(20);
	const [currentLevelObject, setCurrentLevelObject] = useState({});
	const [pastLevels, setPastLevels] = useState([]);
	const [toggleInventory, setToggleInventory] = useState(false);

	useEffect(() => {
		setCurrentLevelObject(storylines[character.level])
		setPastLevels(character.pastLevels || []);
		setTypewriterDelay(user.textSpeed)
	}, [character.level, character.pastLevels, user.textSpeed])

	useEffect(() => {
		if (currentLevelObject?.name && !(pastLevels?.includes(currentLevelObject.name)) && !(isBlacklistedChoice(currentLevelObject.name))) {
			setPastLevels(prev => [...prev, currentLevelObject.name])
		}
	}, [currentLevelObject, pastLevels]);

	useEffect(() => {
		const characterFlattened = flattenToSingleKeys(character)
		if (currentLevelObject?.text) {
			const replacePlaceholders = (template, data) => {
				// Replaces words surrounded by {{}} with their respective items
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
		if (currentLevelObject?.modifier && currentLevelObject?.name && !pastLevels?.includes(currentLevelObject.name)) {
			const getModifierHandlers = () => {
				const statNames = ['health', 'strength', 'defense', 'wisdom', 'luck'];
				const itemNames = ['head', 'chest', 'hands', 'legs', 'feet', 'torch', 'amulet', 'weapon', 'healthPotions'];
				const handlers = {
					gold: (value) =>
						dispatch(
							updateCharacterField({
								field: 'gold',
								value: character.gold + value < 0 ? 0 : character.gold + value
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
					luckCheck: () => {
						setTimeout(() => {
							const result = campaignLuckCheck(character.stats.luck, currentLevelObject?.modifier?.event);
							console.log('Luck check result: ', result);
							setCurrentLevelObject(storylines[result])
						}, 3000)
					},
					torchCheck: () => {
						setTimeout(() => {
							if (character.items.torch) {
								setCurrentLevelObject(storylines['04a-Torch Used']);
							} else {
								setCurrentLevelObject(storylines['04b-No Torch']);
							}
						}, 3000)
					},
					death: async () => {
						console.log(pastLevels, pastLevels?.includes(currentLevelObject)); // trying to prevent multiple saving
						// because the Death story name isnt being added to pastLevels
						if (!pastLevels.includes(currentLevelObject.name)) {
							const characterData = {...character, level: currentLevelObject.name, pastLevels: pastLevels };
							saveGame(dispatch, supabase, characterData)
							handleUserStats('deaths', null, null, user, dispatch)
						}
					},
					end: async () => {
						const characterData = {...character, level: currentLevelObject.name, pastLevels: pastLevels };
						saveGame(dispatch, supabase, characterData);
						handleUserStats('wins', null, null, user, dispatch)
					}
				};
				// dynamically updates stats
				statNames.forEach((stat) => {
					handlers[stat] = (value) => {
						handleUserStats('totalHealed', value, null, user, dispatch);
						dispatch(
							updateStat({
								statName: stat,
								value: stat === 'health' && character.stats[stat] + value > classDefaultValues[character.charClass] ? classDefaultValues[character.charClass] : character.stats[stat] + value,
							})
						);
					}
				});
				// dynamically updates items
				itemNames.forEach((item) => {
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
					handleModifierAlert(dispatch, currentLevelObject.modifier);
				} else {
					console.warn('Unknown modifier:', modType);
				}
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentLevelObject]);

	const handleChoiceSelect = (target) => {
		setCurrentLevelObject(storylines[target])
	}

	const handleTyperwriterSpeedChange = async (event) => {
		const { error } = await supabase.auth.updateUser({
			data: {
				textSpeed: event.target.value
			}
		})
		if (error) {
				dispatch(setSnackbar({
					openSnackbar: true,
					snackbarErrorMessage: error.message,
					snackbarSeverity: 'error'
				}))
		} else {
			dispatch(updateUserField({
				field: 'textSpeed',
				value: event.target.value
			}))
			setTypewriterDelay(event.target.value);
		}

	};

	const handleInventoryToggle = () => {
		setToggleInventory(!toggleInventory);
	}

	return (
		<div id="playPage" className="page">
			<div id="topRow">
				<MenuDrawer characterData={{ ...character, level: currentLevelObject.name, pastLevels: pastLevels, textSpeed: typewriterDelay }} supabase={supabase} />
				<div className="inventoryAndSpeed">
					{window.innerWidth >= 430 && (
						<div className="pinInventoryToggle">
							<FormControlLabel
								className="inventoryToggle"
								control={
								<Checkbox
									checked={toggleInventory}
									onChange={handleInventoryToggle}
									className="inventoryCheckbox"
								/>}
								label="Pin Inventory"
							/>
						</div>
					)}
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
							<MenuItem value={0}>Instant</MenuItem>
						</Select>
					</div>
				</div>
			</div>
			<div id="storyTextArea">
				{user.textSpeed === 0 ? (
					<p className="instantTextBlock">{storyText}</p>
				) : (
					<Typewriter
						options={{
							strings: storyText,
							autoStart: true,
							loop: false,
							delay: typewriterDelay,
							wrapperClassName: 'text'
						}}
					/>
				)}
				{currentLevelObject.modifier && currentLevelObject?.modifier?.fight ? (
					<Combat
						currentLevelObject={currentLevelObject}
						callback={setCurrentLevelObject}
						supabase={supabase}
						pastLevels={pastLevels}
						textSpeed={typewriterDelay}
					/>
				) : (
					<Story
						currentLevelObject={currentLevelObject}
						choiceSelect={handleChoiceSelect}
						pastLevels={pastLevels}
						character={character}
					/>
				)}
				{window.innerWidth >= 430 && toggleInventory && (<PinnedInventory character={character}/>)}
			</div>
			{(currentLevelObject?.modifier?.death || currentLevelObject.modifier?.end) && (
				<>
					<h2 id="finalText">{currentLevelObject.modifier.death ? "You have died." : "Congratulations! You have won!"}</h2>
					<LogoutButton type="backToSelect" text="Back to Character Select" customClassName="deathButtons"/>
					<LogoutButton text="Sign Out" customClassName="deathButtons"/>
				</>
			)}
		</div>
	)
}

export default Play;
