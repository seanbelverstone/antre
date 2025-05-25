import { useEffect, useState } from 'react';
import enemyIcons from '../../assets/enemyIcons';
import '../css/EnemyImageAndPlayerHealth.css';
import { classDefaultValues, enemyWeapons } from '../../utils/damageCalculations';
import CustomTooltip from '../Tooltip';
import { camelToTitle, titleToCamel } from '../../utils/functions';

const EnemyImageAndPlayerHealth = (props) => {
	const { enemyData, currentEnemyHealth, character, currentPlayerHealth } = props;
	const [enemyHealthWidth, setEnemyHealthWidth] = useState('0%');
	const [playerHealthWidth, setPlayerHealthWidth] = useState('0%');
	// TODO: Add image for UNDEAD_MANTICORE, SCARLET_KNIGHT, INFANTRY and SWORDSMAN

	useEffect(() => {
		setEnemyHealthWidth(`${(100 * currentEnemyHealth) / enemyData.stats.health}%`)
	}, [currentEnemyHealth, enemyData.stats.health])

	useEffect(() => {
		setPlayerHealthWidth(`${(100 * currentPlayerHealth) / classDefaultValues[character.charClass]}%`)
	}, [currentPlayerHealth, character.stats.health, character.charClass])

	const renderTooltipContent = () => {
		return (
			<div className="enemyInfoTooltipContent">
				<span><b>Weapon:</b> {enemyData.weapon}</span>
				<span><b>Damage:</b> {enemyWeapons[titleToCamel(enemyData.weapon)].damage}</span>
				<span><b>Crit:</b> {enemyWeapons[titleToCamel(enemyData.weapon)].crit}x</span>
				{Object.keys(enemyData.stats).map((key, value) => (<span key={key}><b className={key}>{camelToTitle(key)}</b>: {value}</span>))}
			</div>
		)
	}

	return (
		<div id="enemyArea">
			<div id="enemyName">{enemyData.name.replace('_', ' ')}</div>
			<div className="healthArea">
				<div className="healthText">
					{currentEnemyHealth ?? enemyData.stats.health}/{enemyData.stats.health}
				</div>
				<div id="enemyBar" style={{ width: enemyHealthWidth }}></div>
			</div>
			<div className="enemyImageWrapper">
				<CustomTooltip tooltipTitle={enemyData.name.replace('_', ' ')} tooltipContent={renderTooltipContent()}>
					<img className="enemyImage" src={enemyIcons[enemyData.name]} />
				</CustomTooltip>
			</div>
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