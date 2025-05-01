import Button from "./Button";
import './css/CharacterRow.css';

const CharacterRow = (props) => {
	const { character } = props;
	const { stats } = character;
	return (
		<div className="characterBlock">
			<div className="characterWrapper">

				<section className="identity">
					<div className="name">{character.name}</div>
					<section className="raceAndClass">
						<div className="race">{character.race}</div>
						<div className="charClass">  {character.charClass}</div>
					</section>
				</section>

				<section className="stats">
					<section className="health">
						<div className="subHeadings">HP</div>
						<div>{stats.health}</div>
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
					newClassName="primaryButton"
					variant="contained"
					id="play"
					text="PLAY"
					// onClick={() => playThisCharacter(character)}
				/>

				{/* <DeleteButton
					id={character.id.toString()}
					jwtToken={user.jwtToken}
					customText="Are you sure you want to delete this character?"
					callback={handleDelete}
				/> */}
			</section>
		</div>
	)
}

export default CharacterRow;