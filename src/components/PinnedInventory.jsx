import CustomTooltip from "./Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import './css/PinnedInventory.css';
import { Divider } from "@mui/material";
import { classDefaultValues, playerWeapons } from "../utils/damageCalculations";
import { camelToTitle, titleToCamel } from "../utils/functions";
import CheckIcon from '@mui/icons-material/Check';

export const PinnedInventory = (props) => {
	const { character } = props;
	const { charClass, stats, items, gold } = character;
	const { health, strength, defense, wisdom, luck } = stats;
	const { head, chest, legs, hands, feet, weapon, torch, amulet, healthPotions } = items;

	const weaponName = titleToCamel(weapon);

		const statInfo = {
		title: 'Stats',
		main: [
			{
				header: 'Strength',
				body: `Strength determines how much power an attack has. A basic attack's damage is initially your weapon's base value combined with your strength, then it's randomly adjusted by a dice roll before the enemy's defense reduces the final amount. A critical hit multiplies the overall damage by the weapon's specific critical multiplier.`
			},
			{
				header: 'Defense',
				body: 'Your Defense directly reduces the damage you take from incoming attacks, making you more resilient to enemy blows.'
			},
			{
				header: 'Wisdom',
				body: 'Wisdom enhances your precision, increasing the probability that your attacks will land as critical hits.'
			},
			{
				header: 'Luck',
				body: 'Luck subtly influences your accuracy, decreasing the chance that your attacks will completely miss their intended target.'
			}
		]
	};

	return (
		<div id="pinnedInventory">
			<section id="stats">
				<section id="health">
					<div>HP: {health}/{classDefaultValues[charClass]}</div>
				</section>
				<section id="strength">
					<div>Str: {strength}</div>
				</section>
				<section id="defense">
					<div>Def: {defense}</div>
				</section>

				<section id="wisdom">
					<div>Wis: {wisdom}</div>
				</section>
				<section id="luck">
					<div>Luck: {luck}</div>
				</section>
				<CustomTooltip infoProps={statInfo} tooltipTitle={statInfo.title} tooltipContent={statInfo.main.map(stat => (<p><b>{stat.header}</b>: {stat.body}</p>))}>
					<InfoIcon />
				</CustomTooltip>
			</section>
			<Divider orientation="vertical" variant="middle" flexItem />
			<section id="misc">
				<div id="torch">
					<div className="iconValue" id="torchValue" style={{ backgroundColor: torch ? 'var(--defense)' : 'var(--strength)'}}>{torch ? <CheckIcon id="checkIcon"/> : "X"}</div>
					<div className="iconText">Torch</div>
				</div>
				<div id="amulet">
					<div className="iconValue" id="amuletValue" style={{ backgroundColor: amulet ? 'var(--defense)' : 'var(--strength)'}}>{amulet ? <CheckIcon /> : "X"}</div>
					<div className="iconText">Amulet</div>
				</div>
				<div id="healthPotion">
					<div className="iconValue" id="healthPotionValue" style={{ backgroundColor: healthPotions === 0 ? 'var(--strength)' : 'var(--defense)'}}>{healthPotions}</div>
					<div className="iconText">Health Potions</div>
				</div>
				<div id="gold">
					<div className="iconValue" id="goldValue" style={{ backgroundColor: gold === 0 ? 'var(--strength)' : 'var(--defense)'}}>{gold}</div>
					<div className="iconText">Gold</div>
				</div>
			</section>
			<Divider orientation="vertical" variant="middle" flexItem />
			<section id="items">
				<div id="weapon">
					<div className="invText">
						<div className="key">Weapon</div>
						<div className="value">{camelToTitle(weapon)}</div>
						<div className="weaponStats">
							<span className="stat-label">Damage: {playerWeapons[weaponName].damage}</span> 
							<span className="stat-label">Crit: {playerWeapons[weaponName].crit}x</span>
						</div>
					</div>
				</div>
				<div id="head">
					<div className="invText">
						<div className="key">Head</div>
						<div className="value">{head}</div>
					</div>
				</div>
				<div id="chest">
					<div className="invText">
						<div className="key">Chest</div>
						<div className="value">{chest}</div>
					</div>
				</div>
				<div id="hands">
					<div className="invText">
						<div className="key">Hands</div>
						<div className="value">{hands}</div>
					</div>
				</div>
				<div id="legs">
					<div className="invText">
						<div className="key">Legs</div>
						<div className="value">{legs}</div>
					</div>
				</div>
				<div id="feet">
					<div className="invText">
						<div className="key">Feet</div>
						<div className="value">{feet}</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default PinnedInventory;