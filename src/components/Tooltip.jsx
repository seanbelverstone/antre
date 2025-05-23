import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

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
// TODO: Get tooltip to work on mobile
export const CustomTooltip = (props) => {
	const { children, tooltipTitle, tooltipContent } = props;
  return (
		<MyTooltip
			title={
				<React.Fragment>
					<Typography color="inherit">{tooltipTitle}</Typography>
					{tooltipContent}
				</React.Fragment>
			}
		>
			{children}
		</MyTooltip>
  );
}

export default CustomTooltip;