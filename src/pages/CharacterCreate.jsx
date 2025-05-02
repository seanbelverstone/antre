import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { Alert, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import './css/CharacterSelect.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CharacterCreatePage = ({ supabase }) => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [nameHelperText, setNameHelperText] = useState('');
	const [race, setRace] = useState('');
	const [charClass, setCharClass] = useState('');
	const [stats, setStats] = useState({})
	const [raceDescription, setRaceDescription] = useState('');
	const [description, setDescription] = useState('');
	const [skill, setSkill] = useState('');
	const [weapon, setWeapon] = useState('rusty shortsword');
	const [gold, setGold] = useState(0);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

	const user = useSelector(state => state.user);
	const navigate = useNavigate();

	const classInfo = useMemo(() => ({
		warrior: {
			stats: {
				health: 80,
				strength: 5,
				defense: 4,
				wisdom: 1,
				luck: 2
			},
			description: 'Strong and fierce, the warrior is a reliable combatant.',
			skill: 'Bone Crush: Using their bare hands, the warrior bypasses an enemy\'s defense for massive damage.'
		},
		rogue: {
			stats: {
				health: 60,
				strength: 2,
				defense: 2,
				wisdom: 2,
				luck: 4
			},
			description: 'As deadly as they are cunning, the rogue utilizes their luck to end fights quickly.',
			skill: 'Throw Knives: Get a free opportunity to deal damage with your trusty throwing knives.'
		},
		paladin: {
			stats: {
				health: 70,
				strength: 3,
				defense: 3,
				wisdom: 3,
				luck: 3
			},
			description: 'Using holy powers to surpass their foes, the paladin is the wisest of them all.',
			skill: 'Holy Blade: Call upon the heavens to infuse your blade with light, allowing the paladin to strike with strength and wisdom combined.'
		}
	}), [])

	const handleStats = useCallback(() => {
		if (charClass === '') {
			setStats({
				health: 0,
				strength: 0,
				defense: 0,
				wisdom: 0,
				luck: 0,
			})
			setDescription('');
			setSkill('');
		} else {
			setStats(classInfo[charClass].stats)
			setDescription(classInfo[charClass].description);
			setSkill(classInfo[charClass].skill);
		}
		race !== '' && setRaceBuffs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charClass, classInfo]);

	const setRaceBuffs = useCallback(() => {
		if (race === 'human') {
			setWeapon('longsword');
			setGold(0);
			setStats(prevState => ({
				...prevState,
				wisdom: classInfo?.[charClass]?.stats.wisdom
			}));
			setRaceDescription('Humans come equipped with a steel longsword.')
		}
		if (race === 'dwarf') {
			setGold(20);
			setWeapon('rusty shortsword')
			setStats(prevState => ({
				...prevState,
				wisdom: classInfo?.[charClass]?.stats.wisdom
			}));
			setRaceDescription('Dwarves come equipped with a small bag of gold.')
		}
		if (race === 'elf') {
			const newWisdom = stats.wisdom + 1;
			setStats(prevState => ({
				...prevState,
				wisdom: newWisdom
			}));
			setWeapon('rusty shortsword');
			setGold(0);
			setRaceDescription('Elves start with a bonus to wisdom.')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [race,charClass, classInfo])

	
	useEffect(() => {
		handleStats();
		setRaceBuffs();
	}, [charClass, handleStats, race, setRaceBuffs]);

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
			createNewCharacter();
		}
	};

	const createNewCharacter = async () => {
		const items = {
			head: 'None',
			chest: 'Ragged shirt',
			legs: 'Ragged pants',
			hands: 'None',
			feet: 'Old boots',
			weapon,
			healthPotions: 0,
			torch: 0,
			amulet: 0
		}
		// eslint-disable-next-line no-unused-vars
		const { data, error } = await supabase
			.from('characters')
			.insert([
				{ name,
					race,
					charClass,
					stats,
					items,
					gold,
					user_id: user.id
				}
			])
			.select();
			if (error) {
				setOpenSnackbar(true);
				setSnackbarErrorMessage(error.message);
			} else {
				navigate('/antre/select');
			}
	}
	
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
				<MenuItem value={'human'} id="human">Human</MenuItem>
				<MenuItem value={'elf'} id="elf">Elf</MenuItem>
				<MenuItem value={'dwarf'} id="dwarf">Dwarf</MenuItem>
			</Select>
			<div id="raceDescription" className={`${raceDescription === '' ? 'hidden' : 'show'}`}>
				<div id="description">{raceDescription}</div>
			</div>
			<InputLabel id="classLabel">Class</InputLabel>
			<Select
				labelId="classLabel"
				id="classSelect"
				value={charClass}
				onChange={handleClassChange}
			>
				<MenuItem value={'warrior'} id="warrior">Warrior</MenuItem>
				<MenuItem value={'rogue'} id="rogue">Rogue</MenuItem>
				<MenuItem value={'paladin'} id="paladin">Paladin</MenuItem>
			</Select>
			<div id="classDescription" className={`${description === '' ? 'hidden' : 'show'}`}>
				<div id="stats">
					<div className="health">HP: {stats.health}</div>
					<div className="strength">Strength: {stats.strength}</div>
					<div className="defense">Defense: {stats.defense}</div>
					<div className="wisdom">Wisdom: {stats.wisdom}</div>
					<div className="luck">Luck: {stats.luck}</div>
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
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					{snackbarErrorMessage}
				</Alert>
			</Snackbar>
		</div>
	)
}


export default CharacterCreatePage;