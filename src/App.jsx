import { useMachine } from '@xstate/react';
import { combatMachine } from './combatMachine.js';
import { useEffect, useRef, useState } from 'react';
import { handleMove } from './utils/damageCalculations.js';

/*
For testing purposes and this project (temp)

- buttons at the top of the page to lock in a weapon
- each weapon has a damage value
- add chance to miss for user and enemy
- add chance to crit for user and enemy
- add stats to influence damage rolls
- try to move it all to be inside the combat machine instead of in the app too
- after heal, go back to idle

*/

const playerStats = {
	strength: 5,
	defense: 4,
	wisdom: 2,
	luck: 2
}

const weapons = [
	{ name: 'shortsword', damage: 15, crit: 1.5 },
	{ name: 'longsword', damage: 20, crit: 1.5 },
	{ name: 'battleaxe', damage: 25, crit: 2 },
	{ name: 'dagger', damage: 10, crit: 4 },
	{ name: 'staff', damage: 18, crit: 2.5 },
	{ name: 'bow', damage: 20, crit: 1.75 }
]

export function CombatComponent() {
  const [state, send] = useMachine(combatMachine);
	const [weapon, setWeapon] = useState({});
	const [battleText, setBattleText] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [enemyName, setEnemyName] = useState('skeleton');

	const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [battleText, bottomRef]);

	useEffect(() => {
		console.log(state.value, weapon)
		handleMove(state.value, setBattleText, playerStats, weapon.name, enemyName, send)
	}, [state.value, send, weapon, enemyName])


  return (
		<div style={{ display: 'flex', justifyItems: 'center', alignContent: 'space-evenly', width: '100vw', flexWrap: 'wrap' }}>
			<div className="p-4">
			{weapons.map((wep) => (
				<button className="btn" onClick={() => setWeapon(wep)} key={wep.name} style={{ backgroundColor: weapon.name === wep.name ? 'red' : 'black' }}>{wep.name}</button>
			))}
				<h1 className="text-xl mb-4">State: {state.value.toString()}</h1>
				<h2>Health: {state.context.playerHealth}</h2>
				<h3>Stats</h3>
				<ul>
					<li>Damage: {weapon.damage ?? 0}</li>
					<li>Crit Multiplier: {weapon.crit ?? 0}</li>
				</ul>
				<h2>Enemy Health: {state.context.enemyHealth}</h2>

					<button className="btn" onClick={() => send({ type: 'attack', damage: 30 })} disabled={!weapon.name || state.value !== 'idle'}>
						Attack
					</button>
					<button className="btn" onClick={() => send({ type: 'defend', damage: 30 })} disabled={!weapon.name || state.value !== 'idle'}>
						Defend
					</button>
					<button className="btn" onClick={() => send({ type: 'heal' })} disabled={!weapon.name || state.context.healthPotions === 0 || state.value !== 'idle'}>
						Use a Health Potion: ({state.context.healthPotions} remaining)
					</button>
			</div>
			<div>
				<div style={{ backgroundColor: 'black', width: '300px', height: '300px', padding: '10px', marginLeft: '20px', overflowY: 'auto' }}>
					{battleText?.map((text, i) => <p key={`${i}_${text[0]}`}>{text}</p>)}
					<div ref={bottomRef}></div>
					</div>
			</div>
		</div>
  );
}

export default CombatComponent;