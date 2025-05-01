import "./css/Button.css";

const Button = (props) => {
	const { text, onClick, disabled, newClassName = '' } = props;
	const fullClassName = `button${newClassName ? ` ${newClassName}` : ''}${disabled ? ` disabled ` : ''}`
	return (
		<button className={fullClassName} onClick={onClick} {...props} disabled={disabled}>
			{text}
		</button>
	)
}

export default Button;