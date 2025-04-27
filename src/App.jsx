import { useMachine } from '@xstate/react';
import { combatMachine } from './combatMachine.js';
import { useEffect, useRef, useState } from 'react';

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
const weapons = [
	{ name: 'shortsword', damage: 15, crit: 1.5 },
	{ name: 'longsword', damage: 20, crit: 1.5 },
	{ name: 'battleaxe', damage: 25, crit: 2 },
	{ name: 'dagger', damage: 10, crit: 4 },
	{ name: 'staff', damage: 18, crit: 2.5 },
	{ name: 'bow', damage: 20, crit: 1.75 }
]

const playerStats = {
	strength: 5,
	defense: 4,
	wisdom: 2,
	luck: 2
}

const enemyWeapons = [
	{ name: 'shiv', damage: 8, crit: 2 },
	{ name: 'rusty sword', damage: 14, crit: 1.5 },
	{ name: 'mace', damage: 16, crit: 1.5 },
	{ name: 'axe', damage: 20, crit: 2 }
]

const enemyStats = {
	strength: 2,
	defense: 2,
	wisdom: 1,
	luck: 1
}

export function CombatComponent() {
  const [state, send] = useMachine(combatMachine);
	const [weapon, setWeapon] = useState({});
	const [battleText, setBattleText] = useState([]);

	const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [battleText, bottomRef]);

	
	const damageCalculator = (selectedWeapon, stats) => {
		const missChance = Math.random() <= 0.1;
		const critChance = Math.random() <= 0.2;
		const diceRoll = Math.ceil(Math.random() * 20);  // Roll between 1 and 20
    const rollModifier = 1.0 + (diceRoll - 10) / 50; // Modifier between 0.91x and 1.10x
		const damage = Math.ceil((selectedWeapon.damage + stats.strength) * rollModifier);
		console.log(rollModifier, damage);
		if (missChance) {
			return { type: 'miss', value: 0 };
		} else if (critChance) {
			return { type: 'crit', value: Math.ceil(damage * selectedWeapon.crit) };
		} else {
			return { type: 'normal', value: damage }
		}
	}

	useEffect(() => {
		if (state.value === 'attacking') {
			setBattleText(prev => [...prev, 'You are attacking'])
			const result = damageCalculator(weapon, playerStats)
			const {type, value: damage} = result;
			console.log(type, damage);
			setTimeout(() => {
				if (type === 'miss') {
					setBattleText(prev => [...prev, 'Oh no, you missed!'])
					send({ type: 'hit', damage });
				} else if (type === 'crit') {
					setBattleText(prev => [...prev, `Nice, you score a critical hit for ${damage} damage!`])
					send({ type: 'hit', damage });			
				} else {
					setBattleText(prev => [...prev, `You did ${damage} damage`])
					send({ type: 'hit', damage });			
				}
			}, 1000)
		}
		if (state.value === 'enemyAttack' || state.value === 'enemyWeakAttack') {
			const enemyWeapon = enemyWeapons[1]
			setBattleText(prev => [...prev, 'enemy attacking!'])
			const result = damageCalculator(enemyWeapon, enemyStats)
			const {type, value: damage} = result;
			setTimeout(() => {
				if (type === 'miss') {
					setBattleText(prev => [...prev, 'Haha, the enemy missed!'])
					send({ type: 'hit', damage });
				} else if (type === 'crit') {
					setBattleText(prev => [...prev, `Uh oh, the enemy hit you critically for ${damage} damage!`])
					send({ type: 'hit', damage });			
				} else {
					setBattleText(prev => [...prev, `The enemy did ${damage} damage`])
					send({ type: 'hit', damage });			
				}		
			}, 1000)
		}
		if (state.value === 'healing') {
			const randomPotionValue = Math.ceil(Math.random() * 15) + 15;
			setBattleText(prev => [...prev, `You healed for ${randomPotionValue}HP`])
			setTimeout(() => {
				send({ type: 'healed', healValue: randomPotionValue });			
			}, 1000)
		}
	}, [state.value, send, weapon])


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