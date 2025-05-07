import "./css/Button.css";

/**
 * My custom component
 *
 * @param {string} text - The text to display in the button
 * @param {Function} onClick - What to execute when clicked
 * @param {Boolean} disabled - On true, disables the button
 * @param {string} customClassName
 * @param {string} id
 * @param {string} type - can be submit, or anything else
 */

const Button = (props) => {
	const { text, onClick, disabled, customClassName = '', id, type } = props;
	const fullClassName = `button${customClassName ? ` ${customClassName}` : ''}${disabled ? ` disabled ` : ''}`
	return (
		<button className={fullClassName} onClick={onClick} disabled={disabled} id={id} type={type}>
			{text}
		</button>
	)
}

export default Button;