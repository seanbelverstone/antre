import "./css/Button.css";

const Button = (props) => {
	const { text, onClick } = props;
	return (
		<button onClick={onClick} {...props}>
			{text}
		</button>
	)
}

export default Button;