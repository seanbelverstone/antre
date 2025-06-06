import { classDefaultValues } from "../utils/damageCalculations";
import Button from "./Button";
import Modal from "./Modal";
import { camelToTitle } from '../utils/functions.js';
import './css/CharacterRow.css';

const CharacterRow = (props) => {
	const { character, playThisCharacter, deleteThisCharacter } = props;
	const { stats } = character;
	return (
		<div className="characterBlock">
			<div className="characterWrapper">

				<section className="identity">
					<div className="name">{character.name}</div>
					<section className="raceAndClass">
						<div className="race">{camelToTitle(character.race)}</div>
						<div className="charClass">  {camelToTitle(character.charClass)}</div>
					</section>
				</section>

				<section className="stats">
					<section className="health">
						<div className="subHeadings">HP</div>
						<div>{stats.health}/{classDefaultValues[character.charClass]}</div>
					</section>
					<section className="strength">
						<div className="subHeadings">Str</div>
						<div>{stats.strength}</div>
					</section>
					<section className="defense">
						<div className="subHeadings">Def</div>
						<div>{stats.defense}</div>
					</section>
					<section className="wisdom">
						<div className="subHeadings">Wis</div>
						<div>{stats.wisdom}</div>
					</section>
					<section className="luck">
						<div className="subHeadings">Luck</div>
						<div>{stats.luck}</div>
					</section>                 
				</section>

				<section className="levelAndTime">
					<section className="level">
						<div className="subHeadings">Level</div>   
						<div>{character.level}</div>
					</section>
					{/* <section  className="time">
						<div className="subHeadings">Time</div>
						<div>{timePlayed}</div>
					</section>                     */}
				</section>
			</div>
			<section className="charButtons">
				<Button
					customClassName="playCharacter"
					text="PLAY"
					onClick={() => playThisCharacter(character)}
				/>
				<Modal
					id={`delete_${character.id}`}
					modalText="Are you sure you want to delete this character?"
					callback={() => deleteThisCharacter(character.id)}
					buttonText="DELETE"
					buttonClassName="deleteCharacter"
				/>
			</section>
		</div>
	)
}

export default CharacterRow;