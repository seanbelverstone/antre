import "./css/Button.css";

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