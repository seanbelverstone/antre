import "./css/Button.css";

const Button = (props) => {
	const { text, onClick, disabled, className = '' } = props;
	return (
		<button className={`button ${disabled ? 'disabled' : ''}${className === '' ? '' : ` ${className}`}`} onClick={onClick} {...props} disabled={disabled}>
			{text}
		</button>
	)
}

export default Button;