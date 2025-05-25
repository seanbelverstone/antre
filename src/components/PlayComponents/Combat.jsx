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
import { Checkbox, FormControlLabel, ToggleButton } from '@mui/material';

const Combat = (props) => {
	const { currentLevelObject, callback, supabase, pastLevels, textSpeed } = props;
	const enemyData = currentLevelObject.enemy;
	const character = useSelector(state => state.character);
	const playerWeaponName = character.items.weapon;

  const [state, send] = useMachine(combatMachine);
	const [battleText, setBattleText] = useState([]);
	const [cooldown, setCooldown] = useState(0)
	const [combatStarted, setCombatStarted] = useState(false)
	const [combatFinished, setCombatFinished] = useState(false);
	const [toggleTips, setToggleTips] = useState(false);
 
	const coverRef = useRef(null);
	const bottomRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		send({ type: 'startBattle', data: { character, enemyData } });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  useEffect(() => {
    battleText.length > 0 && bottomRef.current?.scrollIntoView({ behavior: 'instant' });
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
				level: currentLevelObject.name,
				pastLevels: pastLevels,
				textSpeed: textSpeed
				// NOTE: If it saves with the victory name, it immediately transitions to the next
				// level, making it kinda jarring. Without it though, it saves at the current battle
				// with post-battle stats also saving...
			};
			saveGame(dispatch, supabase, characterData)
			setTimeout(() => {
				setCombatFinished(true)
			}, 2000)
		}
		if (state.value === 'dead') {
			const characterData = {
				...character,
				stats: { ...character.stats, health: state.context.playerHealth },
				items: { ...character.items, healthPotions: state.context.healthPotions },
				level: '00-Death',
				pastLevels: pastLevels,
				textSpeed: textSpeed
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
	console.log(window.innerWidth);

	const damageTotals = damageRange(character, enemyData);
	const riskyDamageTotals = damageRange(character, enemyData, true);
	const regularMissChance = missAndCritChance(character.stats.luck, character.stats.wisdom);
	const riskyMissAndCrit = missAndCritChance(character.stats.luck, character.stats.wisdom, 0.4)
	const rogueWeaponObject = { ...character, items: { ...character.items, weapon: 'Throwing Knives' } };
	const skillDamageRanges = {
		warrior: damageRange(character, { stats: { defense: 0 }}),
		paladin: damageRange(character, enemyData, false, true),
		rogue: damageRange(rogueWeaponObject, enemyData)
	}

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
					<div className="wrap">
						<div className="textGradient"></div>
						<div id="battleTextArea">
							{battleText?.map((text, i) => <p key={`${i}_${text[0]}`}>{text}</p>)}
							<div ref={bottomRef}></div>
						</div>
					</div>
				</div>
					<div id="attacks">
						<Button
							onClick={() => handleAttack('attack')}
							disabled={state.value !== 'idle'}
							text="Balanced Attack"
							tooltipContent={!toggleTips ?
								<>
									<div>Normal: <b>{damageTotals.minDamage}-{damageTotals.maxDamage}</b> damage</div>
									<div>Critical: <b>{damageTotals.critMinDamage}-{damageTotals.critMaxDamage}</b> damage</div>
									<div>Miss Chance: <b>{regularMissChance.missChance}</b></div>
									<div>Crit Chance: <b>{regularMissChance.critChance}</b></div>
								</>
							: null}
						/>
						<Button
							onClick={() => handleAttack('riskyStrike')}
							disabled={state.value !== 'idle'}
							text="Risky Strike"
							tooltipContent={!toggleTips ?
								<>
									<div>Normal: <b>{riskyDamageTotals.minDamage}-{riskyDamageTotals.maxDamage}</b> damage</div>
									<div>Critical: <b>{riskyDamageTotals.critMinDamage}-{riskyDamageTotals.critMaxDamage}</b> damage</div>
									<div>Miss Chance: <b>{riskyMissAndCrit.missChance}</b></div>
									<div>Crit Chance: <b>{riskyMissAndCrit.critChance}</b></div>
								</>
							: null}
						/>
						<Button
							onClick={() => handleAttack(classSkills[character.charClass].name)}
							disabled={cooldown > 0 || state.value !== 'idle'}
							text={`Skill: ${camelToTitle(classSkills[character.charClass].name)}${cooldown > 0 ? `\nCooldown: ${cooldown}` : ''}`}
							tooltipContent={!toggleTips ?
								<>
									<div>{classSkills[character.charClass].effect}</div>
									<div>Normal: <b>{skillDamageRanges[character.charClass].minDamage}-{skillDamageRanges[character.charClass].maxDamage}</b> damage</div>
									<div>Critical: <b>{skillDamageRanges[character.charClass].critMinDamage}-{skillDamageRanges[character.charClass].critMaxDamage}</b> damage</div>
									{character.charClass === 'rogue' && <div>Miss Chance: <b>{regularMissChance.missChance}</b></div>}
								</>
							: null}
						/>
						<Button
							onClick={() => send({ type: 'heal' })}
							disabled={state.context.healthPotions === 0 || state.value !== 'idle' || state.context.playerHealth === classDefaultValues[character.charClass]}
							text={`Use a Health Potion\n(${state.context.healthPotions} remaining)`}
							tooltipContent={!toggleTips ?
								<>
									<div>Healing range: <b>15-30HP</b></div>
								</>
							: null}
						/>
					</div>
					{window.innerWidth <= 768 ? (
						<i id="mobileNote">Hold onto an option (and the enemy) for more information</i>
					) : (
						<FormControlLabel
							control={
							<Checkbox
								checked={toggleTips}
								onChange={() => setToggleTips(!toggleTips)}
							/>}
							label="Disable combat tips"
						/>
					)}
			</div>		
		</div>
  );
}

export default Combat;