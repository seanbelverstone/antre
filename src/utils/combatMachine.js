import { assign, createMachine } from 'xstate';

export const combatMachine = createMachine({
  id: 'combat',
  initial: 'idle',
  context: {
    playerHealth: 100,
    enemyHealth: 100,
		healthPotions: 2
  },
  states: {
    idle: {
      on: {
				startBattle: {
					target: 'idle',
					actions: 'initializeContext'
				},
        attack: 'attacking',
        riskyStrike: 'riskingStrike',
				throwDaggers: 'throwingDaggers',
        heal: 'healing'
      },
    },
		attacking: {
			on: {
				hit: [
					{
						guard: 'isEnemyDead',
						target: 'enemyDead',
						actions: 'enemyTakeDamage'
					},
					{
						target: 'enemyAttack',
						actions: 'enemyTakeDamage'
					}
				]
			}
		},
		riskingStrike : {
			on: {
				hit: [
					{
						guard: 'isEnemyDead',
						target: 'enemyDead',
						actions: 'enemyTakeDamage'
					},
					{
						target: 'enemyAttack',
						actions: 'enemyTakeDamage'
					}
				],
				miss: [
					{
						target: 'enemyStrongAttack'
					}
				]
			}
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
    enemyStrongAttack: {
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
    healing: {
      on: {
        healed: [
          {
            target: 'idle',
            actions: 'healPlayer'
          }
				]
      },
    },
    throwingDaggers: {
      on: {
        daggersThrown: [
          {
            target: 'idle',
            actions: 'enemyTakeDamage'
          }
				]
      },
    },
    dead: {
      type: 'final',
    },
    enemyDead: {
      type: 'final',
    }
  }
}, {
  actions: {
		initializeContext: assign((res) => {
		const { character, enemyData } = res.event.data;
		return {
				playerHealth: character.stats.health,
				enemyHealth: enemyData.stats.health,
				healthPotions: character.items.healthPotions,
				// Initialize other context values from Redux data
				};
		}),
    takeDamage: assign({
      playerHealth: (res) => {
				const damage = res.event.damage ?? 20;
        const newHealth = res.context.playerHealth - damage;
        return newHealth <= 0 ? 0 : newHealth;
      }
    }),
		healPlayer: assign({
			playerHealth: (res) => {
				const healValue = res.event.healValue ?? 15
				const newHealth = res.context.playerHealth + healValue;
				return newHealth >= 100 ? 100 : newHealth;
			},
			healthPotions: (res) => {
				const remainingPotions = res.context.healthPotions - 1
				return remainingPotions;
			}
		}),
		useSkill: assign({
			
		}),
		enemyTakeDamage: assign({
			enemyHealth: (res) => {
				const damage = res.event.damage ?? 15;
				const newEnemyHealth = res.context.enemyHealth - damage;
				return newEnemyHealth <= 0 ? 0 : newEnemyHealth;
			}
		})
  },
  guards: {
    isPlayerDead: (res) => {
			const damage = res.event.damage ?? 20;
    	return res.context.playerHealth - damage <= 0;
    },
		isEnemyDead: (res) => {
			const damage = res.event.damage ?? 15;
    	return res.context.enemyHealth - damage <= 0;
		}
  }
});