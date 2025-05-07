import Button from "../Button";
import '../css/Story.css';

const Story = (props) => {
	const { currentLevelObject, choiceSelect, pastLevels } = props;
	// takes in the options
	// renders the number of buttons required for the choices
	return (
		<div id="storyButtonArea">
			{currentLevelObject?.options && currentLevelObject?.options.map((choice) => (
				<Button
					text={choice.label}
					onClick={() => choiceSelect(choice.target)}
					disabled={pastLevels.includes(choice.target)}
					customClassName="storyChoiceButton"
				/>
			))}
		</div>

	)
}

export default Story;