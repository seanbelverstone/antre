import Button from "../Button";
import '../css/Story.css';

const Story = (props) => {
	const { currentLevelObject, choiceSelect, pastLevels = [], character } = props;
	// takes in the options
	// renders the number of buttons required for the choices'

	return (
		<div id="storyButtonArea">
			{currentLevelObject?.options && (!currentLevelObject?.modifier?.death || !currentLevelObject.modifier?.end) && currentLevelObject?.options.map((choice) => (
				<Button
					text={choice.label}
					onClick={() => choiceSelect(choice.target)}
					disabled={pastLevels?.includes(choice.target) || (choice.value && choice.value > character.gold)}
					customClassName="storyChoiceButton"
					tooltipContent={choice.value && choice.value > character.gold && (<span>You don't have enough gold!</span>)}
				/>
			))}
		</div>

	)
}

export default Story;