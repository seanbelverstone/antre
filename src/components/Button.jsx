import React from 'react';
import "./css/Button.css";

/**
 * General Use Button
 *
 * @param {string} text - The text to display in the button, use \n to render text on a new line
 * @param {Function} onClick - What to execute when clicked
 * @param {Boolean} disabled - On true, disables the button
 * @param {string} customClassName
 * @param {string} id
 * @param {string} type - can be submit, or anything else
 */

const Button = (props) => {
	const { text, onClick, disabled, customClassName = '', id, type } = props;
	const fullClassName = `button${customClassName ? ` ${customClassName}` : ''}${disabled ? ` disabled ` : ''}`
	const containsNewline = text.includes('\n');
	return (
		<button className={fullClassName} onClick={onClick} disabled={disabled} id={id} type={type}>
			{containsNewline ? (
        // If newlines exist, split the text and render with <br />
        text.split('\n').map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < text.split('\n').length - 1 && <br />}
          </React.Fragment>
        	))
      	) : (
        // Otherwise, render the text as a single string (backward compatibility)
        text
      )}
		</button>
	)
}

export default Button;