import { useMachine } from '@xstate/react';
import { combatMachine } from '../../utils/combatMachine.js';
import { useEffect, useRef, useState } from 'react';
import { classSkills, handleMove } from '../../utils/damageCalculations.js';
import Button from '../Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { saveGame, titleToCamel } from '../../utils/functions.js';
import '../css/Combat.css';
import storylines from '../../utils/storylines.js';
import EnemyImageAndPlayerHealth from './EnemyImageAndPlayerHealth.jsx';

const Combat = (props) => {
	const { currentLevelObject, callback, supabase, pastLevels } = props;
	const enemyData = currentLevelObject.enemy;
	const character = useSelector(state => state.character);
	const playerWeaponName = titleToCamel(character.items.weapon);

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
		handleMove(state.value, setBattleText, character.stats, playerWeaponName, enemyData, send)
	}, [state.value, send, character, playerWeaponName, enemyData])

	useEffect(() => {
		console.log(state);
		if (state.value === 'enemyDead' || state.value === 'dead') {
			state.value === 'enemyDead' ? setCombatFinished(true) : callback(storylines['00-Death'])
			const characterData = {...character, stats: { ...character.stats, health: state.context.playerHealth } };
			console.log(characterData);
			saveGame(dispatch, supabase, characterData)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.value])

  return (
		<div id="combatArea">
			<div className="combatCover" ref={coverRef} style={{ display: `${combatStarted ? 'none' : 'flex'}`}}>
				<Button text="Begin Combat" id="beginCombatButton" onClick={() => setCombatStarted(true)} />
			</div>
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
						<Button onClick={() => send({ type: 'attack', damage: 30 })} disabled={state.value !== 'idle'} text="Balanced Attack" />
						<Button onClick={() => send({ type: 'riskyStrike', damage: 30 })} disabled={state.value !== 'idle'} text="Risky Strike" />
						<Button onClick={() => send({ type: 'skill' })} disabled={cooldown > 0 || state.value !== 'idle'} text={`Skill: ${classSkills[character.charClass].name}${cooldown > 0 ? `\nCooldown: ${cooldown}` : ''}`} />
						<Button onClick={() => send({ type: 'heal' })} disabled={state.context.healthPotions === 0 || state.value !== 'idle'} text={`Use a Health Potion\n(${state.context.healthPotions} remaining)`} />
					</div>
			</div>		
		</div>
  );
}

export default Combat;