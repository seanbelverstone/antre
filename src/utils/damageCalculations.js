import { handleUserStats, titleToCamel } from "./functions"

export const classDefaultValues = {
	warrior: 80,
	rogue: 60,
	paladin: 70
}

export const classSkills = {
	warrior: { name: 'boneCrush', effect: 'Bypass enemy defenses on your attack! This attack never misses.' },
	rogue: { name: 'throwKnives', effect: 'Throw your trusty knives at the enemy for a free hit.'},
	paladin: { name: 'holyBlade', effect: 'Your next attack combines your strength and wisdom to calculate damage, and heals you for half of the damage inflicted.'}

}

export const playerWeapons = {
	fists: { damage: 5, crit: 1.25 },
	rustyShortsword: { damage: 10, crit: 1.5 },
	longsword: { damage: 14, crit: 1.75 },
	steelShortsword: { damage: 18, crit: 2 },
	obsidianAxes: { damage: 25, crit: 2.5 },
	dagger: { damage: 8, crit: 4 },
	ironAxe: { damage: 15, crit: 2 },
	halberd: { damage: 30, crit: 1.5 },
	blackIronLongsword: { damage: 22, crit: 2.5 },
	warHammer: { damage: 20, crit: 2 },
	throwingKnives: { damage: 7, crit: 2.5 },
	steelGreatsword: { damage: 20, crit: 2 }
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

export const damageCalculator = (selectedWeapon, stats, defense, bonusDamageMultiplier = 0, extraChanceToMiss = 0, holyBlade = false) => {
	// if warrior class and skill used, do not include enemy defense
	const baseMissChance = 0.1 + extraChanceToMiss;
	const baseCritChance = 0.15;
	const missChance = Math.random() <= Math.max(0, baseMissChance - (stats.luck * 0.01)); // luck reduces the chance of a miss
	const critChance = Math.random() <= (baseCritChance + (stats.wisdom * 0.005)); // wisdom increase the chance of a crit
	const diceRoll = Math.ceil(Math.random() * 20);  // Roll between 1 and 20
	const rollModifier = 1.0 + (diceRoll - 10) / 50; // Modifier between 0.91x and 1.10x
	const damage = Math.ceil(((selectedWeapon.damage + (holyBlade ? (stats.strength * stats.wisdom) : stats.strength)) * rollModifier) - defense);
	if (missChance) {
		return { type: 'miss', value: 0 };
	} else if (critChance) {
		return { type: 'crit', value: bonusDamageMultiplier === 0 ? Math.ceil(damage * selectedWeapon.crit) : Math.ceil(damage * selectedWeapon.crit * (bonusDamageMultiplier * 10)) };
	} else {
		return { type: 'normal', value: bonusDamageMultiplier === 0 ? damage : Math.ceil(damage * (bonusDamageMultiplier * 10)) }
	}
}


export const handleMove = (phase, textFunc, playerStats, weaponName, enemyData, send, charClass, user, dispatch) => {
	console.log(phase);
	const playerWeapon = playerWeapons[titleToCamel(weaponName)];
	const enemyWeapon = enemyWeapons[titleToCamel(enemyData.weapon)];
	// --- PLAYER MOVES ---
	if (phase === 'attacking') {
		textFunc(prev => [...prev, 'You strike with a Balanced Attack!'])
		const result = damageCalculator(playerWeapon, playerStats, enemyData.stats.defense)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestDamage < damage) && handleUserStats('highestDamage', damage, weaponName, user, dispatch)
		setTimeout(() => {
			if (type === 'miss') {
				textFunc(prev => [...prev, 'Your attack misses!'])
				send({ type: 'hit', damage });
			} else if (type === 'crit') {
				textFunc(prev => [...prev, `A critical hit! You deal ${damage} damage!`])
				send({ type: 'hit', damage });			
			} else {
				textFunc(prev => [...prev, `You did ${damage} damage.`])
				send({ type: 'hit', damage });			
			}
		}, 1000)
	}
	if (phase === 'riskingStrike') {
		textFunc(prev => [...prev, `You are attempting a Risky Strike, leaving yourself vulnerable!`])
		const bonusDamageMultiplier = 0.18;
		const extraChanceToMiss = 0.4;
		const result = damageCalculator(playerWeapon, playerStats, enemyData.stats.defense, bonusDamageMultiplier, extraChanceToMiss)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestDamage < damage) && handleUserStats('highestDamage', damage, weaponName, user, dispatch)
		setTimeout(() => {
			if (type === 'miss') {
				textFunc(prev => [...prev, 'You lose your balance, leaving an opening!'])
				send({ type: 'miss', damage });
			} else if (type === 'crit') {
				textFunc(prev => [...prev, `A perfect strike! You deal a massive ${damage} damage!`])
				send({ type: 'hit', damage });			
			} else {
				textFunc(prev => [...prev, `You strike true for ${damage} damage`])
				send({ type: 'hit', damage });			
			}
		}, 1000)
	}
	if (phase === 'healing') {
		const randomPotionValue = Math.ceil(Math.random() * 15) + 15;
		textFunc(prev => [...prev, `You drink a potion and recover ${randomPotionValue}HP`])
		setTimeout(() => {
			send({ type: 'healed', healValue: randomPotionValue, maxHealth: classDefaultValues[charClass] });			
		}, 1000)
		handleUserStats('totalHealed', randomPotionValue, null, user, dispatch);
	}
	if (phase === 'crushingBone') {
		textFunc(prev => [...prev, 'You unleash a devastating bone crush attack!'])
		// Always hits, bypasses defense (hence 0, 0, -0.1)
		const result = damageCalculator(playerWeapon, playerStats, 0, 0, -0.1)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestDamage < damage) && handleUserStats('highestDamage', damage, weaponName, user, dispatch)
		if (type === 'crit') {
			textFunc(prev => [...prev, `With a sickening crunch, you shatter the enemy's vital bones for ${damage} damage!`])
			send({ type: 'hit', damage });			
		} else {
			textFunc(prev => [...prev, `You hear a painful crack as you crush the enemy's bones for ${damage} damage!`])
			send({ type: 'hit', damage });			
		}
	}
	if (phase === 'holyingBlade') {
		textFunc(prev => [...prev, 'You channel divine energy, imbuing your blade with holy light!'])
		// Always hits, adds wisdom to calculation (hence true at the end)
		const result = damageCalculator(playerWeapon, playerStats, enemyData.stats.defense, 0, -0.1, true)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestDamage < damage) && handleUserStats('highestDamage', damage, weaponName, user, dispatch);
		(type !== 'miss' && user.userStatistics.highestDamage < damage) && handleUserStats('totalHealed', Math.floor(damage / 2), null, user, dispatch);
		if (type === 'crit') {
			textFunc(prev => [...prev, `A blinding flash erupts as your holy blade smites the enemy for a massive ${damage} damage and heals you for ${Math.floor(damage / 2)}HP!`])
			send({ type: 'hit', damage, healValue: Math.floor(damage / 2), maxHealth: classDefaultValues[charClass] });
		} else {
			textFunc(prev => [...prev, `Your blessed blade strikes true, dealing ${damage} holy damage, and heals you for ${Math.floor(damage / 2)}HP!`])
			send({ type: 'hit', damage, healValue: Math.floor(damage / 2), maxHealth: classDefaultValues[charClass] });
		}
	}
	if (phase === 'throwingKnives') {
		textFunc(prev => [...prev, 'You swiftly unleash a volley of throwing knives!'])
		// Always hits, adds wisdom to calculation (hence true at the end)
		const result = damageCalculator(playerWeapons.throwingKnives, playerStats, enemyData.stats.defense, 0, 0, true)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestDamage < damage) && handleUserStats('highestDamage', damage, weaponName, user, dispatch)
		if (type === 'miss') {
			textFunc(prev => [...prev, 'Your knives whizz past their target, missing narrowly!'])
			send({ type: 'miss', damage });
		} else if (type === 'crit') {
			textFunc(prev => [...prev, `A flurry of knives find their mark in vital areas, dealing ${damage} critical damage!`])
			send({ type: 'hit', damage });			
		} else {
			textFunc(prev => [...prev, `Your thrown knives strike the enemy for ${damage} damage.`])
			send({ type: 'hit', damage });			
		}
	}

	// --- ENEMY MOVES ---
	if (phase === 'enemyAttack') {
		textFunc(prev => [...prev, 'The enemy attacks!'])
		const result = damageCalculator(enemyWeapon, enemyData.stats, playerStats.defense)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestEnemyDamage < damage) && handleUserStats('highestEnemyDamage', damage, enemyData.weapon, user, dispatch)
		setTimeout(() => {
			if (type === 'miss') {
				textFunc(prev => [...prev, 'The enemy\'s attack misses you.'])
				send({ type: 'hit', damage });
			} else if (type === 'crit') {
				textFunc(prev => [...prev, `The enemy scores a critical hit for ${damage} damage!`])
				send({ type: 'hit', damage });			
			} else {
				textFunc(prev => [...prev, `The enemy deals ${damage} damage.`])
				send({ type: 'hit', damage });			
			}		
		}, 1000)
	}
	if (phase === 'enemyStrongAttack') {
		textFunc(prev => [...prev, 'The enemy is taking advantage of your failure!'])
		const bonusDamageMultiplier = 0.13;
		const result = damageCalculator(enemyWeapon, enemyData.stats, playerStats.defense, bonusDamageMultiplier)
		const {type, value: damage} = result;
		(type !== 'miss' && user.userStatistics.highestEnemyDamage < damage) && handleUserStats('highestEnemyDamage', damage, enemyData.weapon, user, dispatch)
		setTimeout(() => {
			if (type === 'miss') {
				textFunc(prev => [...prev, `The enemy's wild attack misses!`])
				send({ type: 'hit', damage });
			} else if (type === 'crit') {
				textFunc(prev => [...prev, `The enemy strikes a critical blow for ${damage} damage!`])
				send({ type: 'hit', damage });			
			} else {
				textFunc(prev => [...prev, `The enemy strikes hard for ${damage} damage!`])
				send({ type: 'hit', damage });			
			}		
		}, 1000)
	}

	// -- DEATH CONDITIONS --
	if (phase === 'enemyDead') {
		textFunc(prev => [...prev, 'The enemy has been defeated! Congratulations!']);
		handleUserStats('enemiesDefeated', null, null, user, dispatch);
	}
	if (phase === 'dead') {
		textFunc(prev => [...prev, 'You were slain at the hands of your foe.']);
		handleUserStats('deaths', null, null, user, dispatch);
	}
}

export const damageRange = (character, enemyData, risky = false, holyBlade = false) => {
	const playerWeapon = playerWeapons[titleToCamel(character.items.weapon)];
	const minDamage = Math.ceil((((playerWeapon.damage + (holyBlade ? (character.stats.strength * character.stats.wisdom) : character.stats.strength)) * 0.91) - enemyData.stats.defense) * (risky ? 1.8 : 1));
	const maxDamage = Math.ceil((((playerWeapon.damage + (holyBlade ? (character.stats.strength * character.stats.wisdom) : character.stats.strength)) * 1.10) - enemyData.stats.defense) * (risky ? 1.8 : 1));
	const critMinDamage = Math.ceil(minDamage * playerWeapon.crit * (risky ? 1.8 : 1));
	const critMaxDamage = Math.ceil(maxDamage * playerWeapon.crit * (risky ? 1.8 : 1));
	return {
		minDamage,
		maxDamage,
		critMinDamage,
		critMaxDamage
	}
}

export const missAndCritChance = (playerLuck, playerWisdom, extraChanceToMiss = 0) => {
  const baseMissChance = 0.1 + extraChanceToMiss;
  const luckReduction = playerLuck * 0.01;
  const calculatedMissChance = Math.max(0, baseMissChance - luckReduction);

	const baseCritChance = 0.15;
  const wisdomBonus = playerWisdom * 0.005;
  const calculatedCritChance = baseCritChance + wisdomBonus;
  return {
		missChance: `${(calculatedMissChance * 100).toFixed(0)}%`,
		critChance: `${(calculatedCritChance * 100).toFixed(0)}%`
	}
};