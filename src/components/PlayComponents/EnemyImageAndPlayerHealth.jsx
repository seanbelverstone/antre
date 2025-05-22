import { useEffect, useState } from 'react';
import enemyIcons from '../../assets/enemyIcons';
import '../css/EnemyImageAndPlayerHealth.css';
import { classDefaultValues } from '../../utils/damageCalculations';

const EnemyImageAndPlayerHealth = (props) => {
	const { enemyData, currentEnemyHealth, character, currentPlayerHealth } = props;
	const [enemyHealthWidth, setEnemyHealthWidth] = useState('0%');
	const [playerHealthWidth, setPlayerHealthWidth] = useState('0%');

	useEffect(() => {
		setEnemyHealthWidth(`${(100 * currentEnemyHealth) / enemyData.stats.health}%`)
	}, [currentEnemyHealth, enemyData.stats.health])

	useEffect(() => {
		setPlayerHealthWidth(`${(100 * currentPlayerHealth) / classDefaultValues[character.charClass]}%`)
	}, [currentPlayerHealth, character.stats.health, character.charClass])

	return (
		<div id="enemyArea">
			<div id="enemyName">{enemyData.name.replace('_', ' ')}</div>
			<div className="healthArea">
				<div className="healthText">
					{currentEnemyHealth ?? enemyData.stats.health}/{enemyData.stats.health}
				</div>
				<div id="enemyBar" style={{ width: enemyHealthWidth }}></div>
			</div>
			<img className="enemyImage" src={enemyIcons[enemyData.name]} />
			<div className="healthArea">
				<div className="healthText">
					{currentPlayerHealth}/{classDefaultValues[character.charClass]}
				</div>
				<div id="playerBar" style={{ width: playerHealthWidth }}></div>
			</div>
		</div>
	)
}

export default EnemyImageAndPlayerHealth;