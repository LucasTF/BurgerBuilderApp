import React from 'react';

import Burger from '../../BurgerPage/Burger';

import { StyledSummary } from './styles';

const Summary = props => {
	return (
		<StyledSummary>
			<h1>Thank you for your order!</h1>
			<Burger ingredients={props.ingredients} />
		</StyledSummary>
	);
};

export default Summary;
