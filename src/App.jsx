import { useMachine } from '@xstate/react';
import { combatMachine } from './combatMachine.js';
import { useEffect } from 'react';

/*
For testing purposes and this project (temp)

- buttons at the top of the page to lock in a weapon
- each weapon has a damage value
- add chance to miss for user and enemy
- add chance to crit for user and enemy
- add stats to influence damage rolls
- try to move it all to be inside the combat machine instead of in the app too

*/

export function CombatComponent() {
  const [state, send] = useMachine(combatMachine);

	useEffect(() => {
		if (state.value === 'attacking') {
			console.log('You are attacking')
			setTimeout(() => {
				send({ type: 'hit', damage: 30 });			
			}, 1000)
		}
		if (state.value === 'enemyAttack' || state.value === 'enemyWeakAttack') {
			console.log('enemy attacking!')
			setTimeout(() => {
				send({ type: 'hit', damage: 30 });			
			}, 1000)
		}
		if (state.value === 'healing') {
			const randomPotionValue = Math.floor(Math.random() * 30);
			console.log(`You healed for ${randomPotionValue}HP`)
			setTimeout(() => {
				send({ type: 'healed', healValue: randomPotionValue });			
			}, 1000)
		}
	}, [state.value, send])


  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">State: {state.value.toString()}</h1>
			<h2>Health: {state.context.playerHealth}</h2>
			<h2>Enemy Health: {state.context.enemyHealth}</h2>

      {state.matches('idle') && (
        <>
          <button className="btn" onClick={() => send({ type: 'attack', damage: 30 })}>
            Attack
          </button>
          <button className="btn" onClick={() => send({ type: 'defend', damage: 30 })}>
            Defend
          </button>
          <button className="btn" onClick={() => send({ type: 'heal' })}>
            Use a Health Potion
          </button>
        </>
      )}
    </div>
  );
}

export default CombatComponent;