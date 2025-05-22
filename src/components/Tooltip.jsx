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

export const CustomTooltip = (props) => {
	const { children } = props;
  return (
		<MyTooltip
			title={
				<React.Fragment>
					<Typography color="inherit">Tooltip with HTML</Typography>
					<em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
					{"It's very engaging. Right?"}
				</React.Fragment>
			}
		>
			{children}
		</MyTooltip>
  );
}

export default CustomTooltip;