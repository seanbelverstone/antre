import { useMachine } from '@xstate/react';
import { combatMachine } from '../../utils/combatMachine.js';
import { useEffect, useRef, useState } from 'react';
import { classSkills, handleMove, playerWeapons } from '../../utils/damageCalculations.js';
import Button from '../Button.jsx';
import { useSelector } from 'react-redux';
import { toTitleCase } from '../../utils/functions.js';

const Combat = (props) => {
	const { currentLevelObject } = props;
	const enemyData = currentLevelObject.enemy;
	const character = useSelector(state => state.character);
	const playerWeaponName = character.items.weapon;

  const [state, send] = useMachine(combatMachine);
	const [battleText, setBattleText] = useState([]);
	const [cooldown, setCooldown] = useState(0)

	const bottomRef = useRef(null);

	useEffect(() => {
		send({ type: 'startBattle', data: { character, enemyData } });
	}, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [battleText, bottomRef]);

	useEffect(() => {
		handleMove(state.value, setBattleText, character.stats, playerWeaponName, enemyData, send)
	}, [state.value, send, character, playerWeaponName, enemyData])

  return (
		<>
			<div style={{ display: 'flex', justifyItems: 'center', alignContent: 'space-evenly' }}>
				<div className="p-4">
					<h1 className="text-xl mb-4">State: {state.value.toString()}</h1>
					<h2>Health: {state.context.playerHealth}</h2>
					<h3>Stats</h3>
					<ul>
						<li>Weapon: {toTitleCase(character.items.weapon)}</li>
						<li>Damage: {playerWeapons[playerWeaponName].damage ?? 0}</li>
						<li>Crit Multiplier: {playerWeapons[playerWeaponName].crit ?? 0}</li>
					</ul>
					<h2>Enemy Health: {state.context.enemyHealth}</h2>

						<Button onClick={() => send({ type: 'attack', damage: 30 })} disabled={state.value !== 'idle'} text="Attack" />
						<Button onClick={() => send({ type: 'defend', damage: 30 })} disabled={state.value !== 'idle'} text="Defend" />
						<Button onClick={() => send({ type: 'skill' })} disabled={cooldown > 0 || state.value !== 'idle'} text={`Skill: ${classSkills[character.charClass].name}${cooldown > 0 ? `\nCooldown: ${cooldown}` : ''}`} />
						<Button onClick={() => send({ type: 'heal' })} disabled={state.context.healthPotions === 0 || state.value !== 'idle'} text={`Use a Health Potion\n(${state.context.healthPotions} remaining)`} />
				</div>
				<div>
					<div style={{ backgroundColor: 'black', width: '300px', height: '300px', padding: '10px', marginLeft: '20px', overflowY: 'auto', color: 'white' }}>
						{battleText?.map((text, i) => <p key={`${i}_${text[0]}`}>{text}</p>)}
						<div ref={bottomRef}></div>
						</div>
				</div>
			</div>		
		</>
  );
}

export default Combat;