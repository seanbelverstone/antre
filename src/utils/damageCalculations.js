export const classDefaultValues = {
	warrior: 80,
	rogue: 60,
	paladin: 70
}

export const classSkills = {
	warrior: { name: 'Bone Crush', effect: 'Bypass enemy defenses on the next attack' },
	rogue: { name: 'Throw Knives', effect: 'Throw your trusty knives at the enemy for a free hit'},
	paladin: { name: 'Holy Blade', effect: 'Your next attack combines your strength and wisdom to calculate damage'}

}

export const playerWeapons = {
	fists: { damage: 5, crit: 1.25 },
	rustyShortsword: { damage: 10, crit: 1.5 },
	steelShortsword: { damage: 18, crit: 2 },
	obsidianAxes: { damage: 25, crit: 2.5 },
	dagger: { damage: 8, crit: 4 },
	ironAxe: { damage: 15, crit: 2 },
	halberd: { damage: 30, crit: 1.5 },
	blackIronLongsword: { damage: 22, crit: 2.5 },
	warHammer: { damage: 20, crit: 2 }
}

export const enemyWeapons = {
	dagger: { damage: 8, crit: 1.5 },
	ironAxe: { damage: 15, crit: 1.5 },
	teeth: { damage: 10, crit: 2 },
	claws: { damage: 12, crit: 1.5 },
	longsword: { damage: 14, crit: 2.5 },
	warHammer: { damage: 15, crit: 2 },
	pike: { damage: 20, crit: 1.5 },
	axe: { damage: 15, crit: 2 },
	sword: { damage: 12, crit: 2.5 },
	warSpear: { damage: 18, crit: 3 },
	runeStrike: { damage: 15, crit: 3 },
	plagueRuneStrike: { damage: 18, crit: 2.5 },
	bladedWhip: { damage: 20, crit: 3 }
}

export const damageCalculator = (selectedWeapon, stats, defense) => {
	console.log('selectedWeapon: ', selectedWeapon, stats, defense);
	// if warrior class and skill used, do not include enemy defense
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


export const handleMove = (phase, textFunc, playerStats, weaponName, enemyData, send) => {
	// --- PLAYER MOVES ---
	if (phase === 'attacking') {
		textFunc(prev => [...prev, 'You are attacking'])
		const result = damageCalculator(playerWeapons[weaponName], playerStats, enemyData.stats.defense)
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
		const result = damageCalculator(enemyWeapons[enemyData.weapon], enemyData.stats, playerStats.defense)
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
