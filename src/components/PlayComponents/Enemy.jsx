import { useEffect, useState } from 'react';
import enemyIcons from '../../assets/enemyIcons';
import '../css/Enemy.css';

const Enemy = (props) => {
	const { enemyData, currentHealth } = props;
	const [enemyHealthWidth, setEnemyHealthWidth] = useState('0%');

	useEffect(() => {
		setEnemyHealthWidth(`${(100 * currentHealth) / enemyData.stats.health}%`)
	}, [currentHealth, enemyData.stats.health])

	return (
		<div id="enemyArea">
			<div id="enemyName">{enemyData.name}</div>
			<div className="healthArea">
				<div className="healthText">
					{currentHealth ?? enemyData.stats.health}/{enemyData.stats.health}
				</div>
				<div id="enemyBar" style={{ width: enemyHealthWidth }}></div>
			</div>
			<img className="enemyImage" src={enemyIcons[enemyData.name]} />
		
		</div>
	)
}

export default Enemy;