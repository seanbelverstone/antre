import { useEffect, useState } from 'react';
import Button from './Button.jsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { camelToTitle, titleToCamel } from '../utils/functions.js';
import { classDefaultValues, playerWeapons } from '../utils/damageCalculations.js';
import { Divider } from '@mui/material';
import invImages from '../assets/invIcons/index.js';
import './css/InventoryModal.css';
import CustomTooltip from './Tooltip.jsx';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';


export default function InventoryModal(props) {
	const { id, customClassName, character } = props;
	const { name, race, charClass, stats, items, gold } = character;
	const { health, strength, defense, wisdom, luck } = stats;
	const { head, chest, legs, hands, feet, weapon, torch, amulet, healthPotions } = items;
	const weaponName = titleToCamel(weapon);

  const [open, setOpen] = useState(false);
	const [playerHealthWidth, setPlayerHealthWidth] = useState('0%');

	useEffect(() => {
		setPlayerHealthWidth(`${(100 * health) / classDefaultValues[character.charClass]}%`)
	}, [character.charClass, health])

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

	// TODO: Move gold, torch, health potions, and amulet number to be on top of the icon inside a circle

  return (
    <>
      <Button id={id} customClassName={customClassName} onClick={() => setOpen(!open)} text="Inventory" />
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
				classes="inventoryModalWrapper"
      >
				<div id="closeModalRow">
        	<Button customClassName="closeModalButton" onClick={() => setOpen(!open)} icon={<CloseIcon />} />
				</div>
        <DialogContent>
					<h2 className="fullTitle">{name}, the {camelToTitle(race)} {camelToTitle(charClass)}.</h2>
          <div id="inventoryModal">
						<section id="left">
							<section id="statsBlock">
								<div style={{ textAlign: 'center' }}>HP</div>
								<div className="healthArea" id="userHealthArea">
									<div className="healthText">
										{health}/{classDefaultValues[charClass]}
									</div>
									<div id="playerBar" style={{ width: `${playerHealthWidth}` }}></div>
								</div>
								<div className="topStat">
									<section id="strength">
										<div>Strength: {strength}</div>
									</section>
									<section id="defense">
										<div>Defense: {defense}</div>
									</section>
								</div>
								<div className="center">
									<CustomTooltip infoProps={statInfo} tooltipTitle={statInfo.title} tooltipContent={statInfo.main.map(stat => (<p><b>{stat.header}</b>: {stat.body}</p>))}>
										<InfoIcon />
									</CustomTooltip>
								</div>
								<div className="bottomStat">
									<section id="wisdom">
										<div>Wisdom: {wisdom}</div>
									</section>
									<section id="luck">
										<div>Luck: {luck}</div>
									</section>
								</div>
							</section>
							<Divider />
							<section id="misc">
								<section id="topMisc">
									<div id="torch">
										<img className="icon" src={invImages.torch} />
										<div className="iconValue" id="torchValue" style={{ backgroundColor: torch ? 'var(--defense)' : 'var(--strength)'}}>{torch ? <CheckIcon id="checkIcon"/> : "X"}</div>
										<div className="iconText">Torch</div>
									</div>

									<div id="amulet">
										<img className="icon" src={invImages.amulet} />
										<div className="iconValue" id="amuletValue" style={{ backgroundColor: amulet ? 'var(--defense)' : 'var(--strength)'}}>{amulet ? <CheckIcon /> : "X"}</div>
										<div className="iconText">Amulet</div>
									</div>
								</section>
								<section id="bottomMisc">
									<div id="healthPotion">
										<img className="icon" src={invImages.healthPotion} />
										<div className="iconValue" id="healthPotionValue" style={{ backgroundColor: healthPotions === 0 ? 'var(--strength)' : 'var(--defense)'}}>{healthPotions}</div>
										<div className="iconText">Health Potions</div>
									</div>

									<div id="gold">
										<img className="icon" src={invImages.gold} />
										<div className="iconValue" id="goldValue" style={{ backgroundColor: gold === 0 ? 'var(--strength)' : 'var(--defense)'}}>{gold}</div>
										<div className="iconText">Gold</div>
									</div>
								</section>
							</section>
						</section>
						<Divider orientation="vertical" />
						<section id="right">
							<div id="weapon">
								<img className="equipmentIcon" src={invImages.sword} />
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
								<img className="equipmentIcon" src={invImages.head} />
								<div className="invText">
									<div className="key">Head</div>
									<div className="value">{head}</div>
								</div>
							</div>
							<div id="chest">
								<img className="equipmentIcon" src={invImages.chest} />
								<div className="invText">
									<div className="key">Chest</div>
									<div className="value">{chest}</div>
								</div>
							</div>
							<div id="hands">
								<img className="equipmentIcon" src={invImages.hands} />
								<div className="invText">
									<div className="key">Hands</div>
									<div className="value">{hands}</div>
								</div>
							</div>
							<div id="legs">
								<img className="equipmentIcon" src={invImages.legs} />
								<div className="invText">
									<div className="key">Legs</div>
									<div className="value">{legs}</div>
								</div>
							</div>
							<div id="feet">
								<img className="equipmentIcon" src={invImages.feet} />
								<div className="invText">
									<div className="key">Feet</div>
									<div className="value">{feet}</div>
								</div>
							</div>
						</section>
					</div>

        </DialogContent>
      </Dialog>
    </>
  );
}