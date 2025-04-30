import "./css/Button.css";

const Button = (props) => {
	const { text, onClick, disabled, className } = props;
	return (
		<button className={`${disabled ? 'disabled' : ''} ${className}`} onClick={onClick} {...props} disabled={disabled}>
			{text}
		</button>
	)
}

export default Button;