import "./css/Button.css";

const Button = (props) => {
	const { text, onClick, disabled, customClassName = '', id } = props;
	const fullClassName = `button${customClassName ? ` ${customClassName}` : ''}${disabled ? ` disabled ` : ''}`
	return (
		<button className={fullClassName} onClick={onClick} disabled={disabled} id={id}>
			{text}
		</button>
	)
}

export default Button;