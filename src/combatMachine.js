import { assign, createMachine } from 'xstate';

export const combatMachine = createMachine({
  id: 'combat',
  initial: 'idle',
  context: {
    playerHealth: 100,
    enemyHealth: 100
  },
  states: {
    idle: {
      on: {
        attack: 'enemyAttack',
        defend: 'enemyWeakAttack',
        heal: 'healing'
      },
    },
    enemyAttack: {
      on: {
        hit: [
          {
            guard: 'isPlayerDead',
            target: 'dead',
            actions: 'takeDamage'
          },
          {
            target: 'idle',
            actions: 'takeDamage'
          }
        ],
      },
    },
    enemyWeakAttack: {
      on: {
        hit: [
          {
            guard: 'isPlayerDead',
            target: 'dead',
            actions: 'takeReducedDamage'
          },
          {
            target: 'idle',
            actions: 'takeReducedDamage'
          }
        ],
      },
    },
    healing: {
      on: {
        healed: [
					{
						target: 'enemyAttack',
						actions: 'healPlayer'
					}
				]
      },
    },
    dead: {
      type: 'final',
    }
  }
}, {
  actions: {
    takeDamage: assign({
      playerHealth: (res) => {
				console.log(res.event);
				const damage = res.event.damage ?? 20;
        const newHealth = res.context.playerHealth - damage;
        return newHealth <= 0 ? 0 : newHealth;
      }
    }),
    takeReducedDamage: assign({
      playerHealth: (res) => {
				const damage = res.event.damage ?? 20
        const newHealth = res.context.playerHealth - (Math.floor(damage / 2));
        return newHealth <= 0 ? 0 : newHealth;
      }
    }),
		healPlayer: assign({
			playerHealth: (res) => {
				const healValue = res.event.healValue ?? 15
				const newHealth = res.context.playerHealth + healValue;
				return newHealth >= 100 ? 100 : newHealth;
			}
		})
  },
  guards: {
    isPlayerDead: (res) => {
      return res.context.playerHealth - 20 <= 0; // Because we apply 20 damage right after
    }
  }
});