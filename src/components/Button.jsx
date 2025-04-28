import "./css/Button.css";

const Button = (props) => {
	const { text, onClick, disabled } = props;
	return (
		<button className={`${disabled ? 'disabled' : ''}`} onClick={onClick} {...props}>
			{text}
		</button>
	)
}

export default Button;