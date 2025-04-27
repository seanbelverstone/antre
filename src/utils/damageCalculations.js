const weapons = {
	shortsword: { damage: 15, crit: 1.5 },
	longsword: { damage: 20, crit: 1.5 },
	battleaxe: { damage: 25, crit: 2 },
	dagger: { damage: 10, crit: 4 },
	staff: { damage: 18, crit: 2.5 },
	bow: { damage: 20, crit: 1.75 }
}

const enemies = {
	goblin: {
		stats: {
			strength: 2, defense: 2, wisdom: 1, luck: 1
		},
		weapon: {
			name: 'shiv', damage: 8, crit: 2
		}
	},
	skeleton: {
		stats: {
			strength: 3, defense: 1, wisdom: 2, luck: 2
		},
		weapon: {
			name: 'sword', damage: 12, crit: 1.5
		}
	}
}

// const enemyWeapons = [
// 	{ name: 'rusty sword', damage: 14, crit: 1.5 },
// 	{ name: 'mace', damage: 16, crit: 1.5 },
// 	{ name: 'axe', damage: 20, crit: 2 }
// ]


export const damageCalculator = (selectedWeapon, stats, defense) => {
	console.log('selectedWeapon: ', selectedWeapon, stats, defense);
	const baseMissChance = 0.1;
	const baseCritChance = 0.15;
	const missChance = Math.random() <= Math.max(0, baseMissChance - (stats.luck * 0.01)); // luck reduces the chance of a miss
	const critChance = Math.random() <= (baseCritChance + (stats.wisdom * 0.005)); // wisdom increase the chance of a crit
	console.log(missChance, critChance);
	const diceRoll = Math.ceil(Math.random() * 20);  // Roll between 1 and 20
	const rollModifier = 1.0 + (diceRoll - 10) / 50; // Modifier between 0.91x and 1.10x
	const damage = Math.ceil((selectedWeapon.damage + stats.strength) * rollModifier) - defense;
	if (missChance) {
		return { type: 'miss', value: 0 };
	} else if (critChance) {
		return { type: 'crit', value: Math.ceil(damage * selectedWeapon.crit) };
	} else {
		return { type: 'normal', value: damage }
	}
}


export const handleMove = (phase, textFunc, playerStats, weaponName, enemyName, send) => {
	// --- PLAYER MOVES ---
	if (phase === 'attacking') {
		textFunc(prev => [...prev, 'You are attacking'])
		const result = damageCalculator(weapons[weaponName], playerStats, enemies[enemyName].stats.defense)
		const {type, value: damage} = result;
		setTimeout(() => {
			if (type === 'miss') {
				textFunc(prev => [...prev, 'Oh no, you missed!'])
				send({ type: 'hit', damage });
			} else if (type === 'crit') {
				textFunc(prev => [...prev, `Nice, you score a critical hit for ${damage} damage!`])
				send({ type: 'hit', damage });			
			} else {
				textFunc(prev => [...prev, `You did ${damage} damage`])
				send({ type: 'hit', damage });			
			}
		}, 1000)
	}
	if (phase === 'healing') {
		const randomPotionValue = Math.ceil(Math.random() * 15) + 15;
		textFunc(prev => [...prev, `You healed for ${randomPotionValue}HP`])
		setTimeout(() => {
			send({ type: 'healed', healValue: randomPotionValue });			
		}, 1000)
	}

	// --- ENEMY MOVES ---
	if (phase === 'enemyAttack' || phase === 'enemyWeakAttack') {
		textFunc(prev => [...prev, 'enemy attacking!'])
		const result = damageCalculator(enemies[enemyName].weapon, enemies[enemyName].stats, playerStats.defense)
		const {type, value: damage} = result;
		setTimeout(() => {
			if (type === 'miss') {
				textFunc(prev => [...prev, 'Haha, the enemy missed!'])
				send({ type: 'hit', damage });
			} else if (type === 'crit') {
				textFunc(prev => [...prev, `Uh oh, the enemy hit you critically for ${damage} damage!`])
				send({ type: 'hit', damage });			
			} else {
				textFunc(prev => [...prev, `The enemy did ${damage} damage`])
				send({ type: 'hit', damage });			
			}		
		}, 1000)
	}

	// -- DEATH CONDITIONS --
	if (phase === 'enemyDead') {
		textFunc(prev => [...prev, 'The enemy has been defeated! Congratulations!'])
	}
	if (phase === 'dead') {
		textFunc(prev => [...prev, 'You were slain at the hands of your foe.'])
	}
}
