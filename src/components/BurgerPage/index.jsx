import React from 'react';

import Burger from './Burger';

import { StyledBurgerPage } from './styles';

const BurgerPage = props => {
	return (
		<StyledBurgerPage>
			<Burger {...props} />
		</StyledBurgerPage>
	);
};

export default BurgerPage;
