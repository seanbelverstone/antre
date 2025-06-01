import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "./css/Button.css";

const MyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

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

const Button = React.forwardRef((props, ref) => {
	const { text = '', onClick, disabled, customClassName = '', id, type, tooltipContent, icon } = props;
	const fullClassName = `button${customClassName ? ` ${customClassName}` : ''}${disabled ? ` disabled ` : ''}`

	const containsNewline = text.includes('\n');

	const buttonContent = (
		<button
			className={fullClassName}
			onClick={onClick}
			disabled={disabled}
			id={id}
			type={type}
			ref={ref}
			>
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
			{icon}
		</button>
	)
  // Conditionally wrap the buttonContent with MyTooltip if tooltipContent is provided
  if (tooltipContent) { // Check for the presence of tooltipContent to enable tooltip
    return (
      <MyTooltip
        title={
          // Render the dynamic tooltipContent passed as a prop
          <React.Fragment>
            {/* You can add default styling or structure here if needed */}
            {tooltipContent}
          </React.Fragment>
        }
      >
				<span className="buttonContentWrapper">
        	{buttonContent}
				</span>
      </MyTooltip>
    );
  } else {
    // If no tooltipContent prop is provided, just render the button as before
    return buttonContent;
  }
})

export default Button;