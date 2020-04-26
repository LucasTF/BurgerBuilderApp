import React from 'react';

import { StyledButton } from './styles';

const Button = props => {
	return (
		<StyledButton
			className={props.type}
			disabled={props.disabled}
			onClick={props.click}
		>
			{props.children}
		</StyledButton>
	);
};

export default Button;
