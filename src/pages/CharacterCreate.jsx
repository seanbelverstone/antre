import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";

const CharacterCreatePage = () => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [nameHelperText, setNameHelperText] = useState('');
	const [race, setRace] = useState('');
	const [charClass, setCharClass] = useState('');
	const [health, setHealth] = useState(0);
	const [strength, setStrength] = useState(0);
	const [defense, setDefense] = useState(0);
	const [wisdom, setWisdom] = useState(0);
	const [luck, setLuck] = useState(0);
	const [description, setDescription] = useState('');
	const [descriptonDisplay, setDescriptionDisplay] = useState(0);
	const [skill, setSkill] = useState('');

	const setStats = useCallback(() => {
		switch (charClass) {
		case 'Warrior':
			setHealth(80);
			setStrength(5);
			setDefense(4);
			setWisdom(1);
			setLuck(2);
			setDescription('Strong and fierce, the warrior is a reliable combatant.');
			setSkill('Bone Crush: Using their bare hands, the warrior bypasses an enemy\'s defense for massive damage.');
			setDescriptionDisplay(1);
			break;
		case 'Rogue':
			setHealth(60);
			setStrength(4);
			setDefense(2);
			setWisdom(2);
			setLuck(4);
			setDescription('As deadly as they are cunning, the rogue utilizes their luck to end fights quickly.');
			setSkill('Throw Knives: Get a free opportunity to deal damage with your trusty throwing knives.');
			setDescriptionDisplay(1);
			break;
		case 'Paladin':
			setHealth(70);
			setStrength(3);
			setDefense(3);
			setWisdom(4);
			setLuck(2);
			setDescription('Using holy powers to surpass their foes, the paladin is the wisest of them all.');
			setSkill('Holy Blade: Call upon the heavens to infuse your blade with light, allowing the paladin to strike with strength and wisdom combined.');
			setDescriptionDisplay(1);
			break;
		default:
			setHealth(0);
			setStrength(0);
			setDefense(0);
			setWisdom(0);
			setLuck(0);
			setDescription('');
			setSkill('');
		}
	}, [charClass]);

	
	useEffect(() => {
		setStats();
	}, [charClass, setStats]);

	const handleRaceChange = (event) => {
		setRace(event.target.value);
	};

	const handleClassChange = (event) => {
		setCharClass(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		checkName();
	};

	const checkName = () => {
		if (name.length > 20 || name.length < 1) {
			setNameError(true);
			setNameHelperText('Please use a name that is less than 20 characters');
			return;
		} else {
			setNameError(false);
			setNameHelperText('');
			// createNewCharacter();
		}
	};
	
	return (
		<div className="page" id="characterCreatePage">
			<form onSubmit={handleSubmit}>
			<TextField
				className="formInput"
				label="Name"
				variant="standard"
				onChange={event => setName(event.target.value)}
				error={nameError}
				helperText={nameHelperText}
			/>
			<InputLabel id="raceLabel">Race</InputLabel>
			<Select
				labelId="raceLabel"
				id="raceSelect"
				value={race}
				onChange={handleRaceChange}
			>
				<MenuItem value={'Human'} id="human">Human</MenuItem>
				<MenuItem value={'Elf'} id="elf">Elf</MenuItem>
				<MenuItem value={'Dwarf'} id="dwarf">Dwarf</MenuItem>
			</Select>
			<InputLabel id="classLabel">Class</InputLabel>
			<Select
				labelId="classLabel"
				id="classSelect"
				value={charClass}
				onChange={handleClassChange}
			>
				<MenuItem value={'Warrior'} id="warrior">Warrior</MenuItem>
				<MenuItem value={'Rogue'} id="rogue">Rogue</MenuItem>
				<MenuItem value={'Paladin'} id="paladin">Paladin</MenuItem>
			</Select>
			<div id="classDescription" style={{ opacity: descriptonDisplay }}>
				<div id="stats">
					<div className="health">HP: {health}</div>
					<div className="strength">Strength: {strength}</div>
					<div className="defense">Defense: {defense}</div>
					<div className="wisdom">Wisdom: {wisdom}</div>
					<div className="luck">Luck: {luck}</div>
				</div>
				<div id="desAndSkill">
					<div id="description">{description}</div>
					<h3 id="skillName">Skill</h3>
					<div id="skill">{skill}</div>
				</div>
			</div>
			<Button
				className="primaryButton"
				variant="contained"
				color="primary"
				type="submit"
				disabled={race === '' || charClass === ''}
				text="Create"
			/>
			</form>
		</div>
	)
}


export default CharacterCreatePage;