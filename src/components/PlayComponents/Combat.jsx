import { useMachine } from '@xstate/react';
import { combatMachine } from '../../utils/combatMachine.js';
import { useEffect, useRef, useState } from 'react';
import { classDefaultValues, classSkills, damageRange, handleMove, missAndCritChance } from '../../utils/damageCalculations.js';
import Button from '../Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { camelToTitle, saveGame } from '../../utils/functions.js';
import '../css/Combat.css';
import storylines from '../../utils/storylines.js';
import EnemyImageAndPlayerHealth from './EnemyImageAndPlayerHealth.jsx';
import CustomTooltip from '../Tooltip.jsx';

const Combat = (props) => {
	const { currentLevelObject, callback, supabase } = props;
	const enemyData = currentLevelObject.enemy;
	const character = useSelector(state => state.character);
	const playerWeaponName = character.items.weapon;

  const [state, send] = useMachine(combatMachine);
	const [battleText, setBattleText] = useState([]);
	const [cooldown, setCooldown] = useState(0)
	const [combatStarted, setCombatStarted] = useState(false)
	const [combatFinished, setCombatFinished] = useState(false);
 
	const coverRef = useRef(null);
	const bottomRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		send({ type: 'startBattle', data: { character, enemyData } });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [battleText, bottomRef]);

	useEffect(() => {
		handleMove(state.value, setBattleText, character.stats, playerWeaponName, enemyData, send, character.charClass)
	}, [state.value, send, character, playerWeaponName, enemyData])

	useEffect(() => {
		if (state.value === 'enemyDead') {
			const characterData = {
				...character,
				stats: { ...character.stats, health: state.context.playerHealth },
				items: { ...character.items, healthPotions: state.context.healthPotions },
				level: currentLevelObject.name
				// NOTE: If it saves with the victory name, it immediately transitions to the next
				// level, making it kinda jarring. Without it though, it saves at the current battle
				// with post-battle stats also saving...
			};
			saveGame(dispatch, supabase, characterData)
			setCombatFinished(true)
		}
		if (state.value === 'dead') {
			const characterData = {
				...character,
				stats: { ...character.stats, health: state.context.playerHealth },
				items: { ...character.items, healthPotions: state.context.healthPotions },
				level: '00-Death'
			};
			callback(storylines['00-Death'])
			saveGame(dispatch, supabase, characterData)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.value])

	const handleAttack = (type) => {
		send({ type });
		if (type === classSkills[character.charClass].name) {
			setCooldown(2);
		} else {
			cooldown > 0 && setCooldown(cooldown - 1);
		}
	}


	const damageTotals = damageRange(character, enemyData);
	const regularMissChance = missAndCritChance(character.stats.luck, character.stats.wisdom);
	const riskyDamageTotals = damageRange(character, enemyData, true);
	const riskyMissAndCrit = missAndCritChance(character.stats.luck, character.stats.wisdom, 0.4)

  return (
		<div id="combatArea">
			{/* COVER FOR STARTING COMBAT */}
			<div className="combatCover" ref={coverRef} style={{ display: `${combatStarted ? 'none' : 'flex'}`}}>
				<Button text="Begin Combat" id="beginCombatButton" onClick={() => setCombatStarted(true)} />
			</div>
			{/* COVER FOR VICTORY */}
			<div className="combatCover" id="combatVictory" ref={coverRef} style={{ display: `${combatFinished ? 'flex' : 'none'}`}}>
				<p id="victoryText">The enemy has been defeated!</p>
				<Button text="Continue" id="continueButton" onClick={() => callback(storylines[currentLevelObject.victory.target])} />
			</div>
			<div id="combatSection" style={{ pointerEvents: combatStarted ? 'all' : 'none' }}>
				<div id="enemyAndTextArea">
					<EnemyImageAndPlayerHealth
						enemyData={enemyData}
						currentEnemyHealth={state.context.enemyHealth}
						character={character}
						currentPlayerHealth={state.context.playerHealth}
					/>
					<div id="battleTextArea" style={{ backgroundColor: 'black', width: '300px', height: '300px', padding: '10px', marginLeft: '20px', overflowY: 'auto', color: 'white' }}>
						{battleText?.map((text, i) => <p key={`${i}_${text[0]}`}>{text}</p>)}
						<div ref={bottomRef}></div>
					</div>
				</div>

					{/* <h3>Stats</h3> */}
					{/* Maybe move this to a tooltip or something */}
					{/* <ul>
						<li>Weapon: {toTitleCase(character.items.weapon)}</li>
						<li>Damage: {playerWeapons[playerWeaponName].damage ?? 0}</li>
						<li>Crit Multiplier: {playerWeapons[playerWeaponName].crit ?? 0}</li>
					</ul> */}
					{/* TODO: Add tooltip for attacking, which shows damage ranges and chance to miss & chance to crit */}
					<div id="attacks">
						<Button
							onClick={() => handleAttack('attack')}
							disabled={state.value !== 'idle'}
							text="Balanced Attack"
							tooltipContent={
								<>
									<div>Normal: <b>{damageTotals.minDamage}-{damageTotals.maxDamage}</b> damage</div>
									<div>Critical: <b>{damageTotals.critMinDamage}-{damageTotals.critMaxDamage}</b> damage</div>
									<div>Miss Chance: <b>{regularMissChance.missChance}</b></div>
									<div>Crit Chance: <b>{regularMissChance.critChance}</b></div>
								</>
							}
						/>
						<Button
							onClick={() => handleAttack('riskyStrike')}
							disabled={state.value !== 'idle'}
							text="Risky Strike"
							tooltipContent={
								<>
									<div>Normal: <b>{riskyDamageTotals.minDamage}-{riskyDamageTotals.maxDamage}</b> damage</div>
									<div>Critical: <b>{riskyDamageTotals.critMinDamage}-{riskyDamageTotals.critMaxDamage}</b> damage</div>
									<div>Miss Chance: <b>{riskyMissAndCrit.missChance}</b></div>
									<div>Crit Chance: <b>{riskyMissAndCrit.critChance}</b></div>
								</>
							}
						/>
						<Button
							onClick={() => handleAttack(classSkills[character.charClass].name)}
							disabled={cooldown > 0 || state.value !== 'idle'}
							text={`Skill: ${camelToTitle(classSkills[character.charClass].name)}${cooldown > 0 ? `\nCooldown: ${cooldown}` : ''}`}
						/>
						<Button
							onClick={() => send({ type: 'heal' })}
							disabled={state.context.healthPotions === 0 || state.value !== 'idle' || state.context.playerHealth === classDefaultValues[character.charClass]}
							text={`Use a Health Potion\n(${state.context.healthPotions} remaining)`}
						/>
					</div>
			</div>		
		</div>
  );
}

export default Combat;