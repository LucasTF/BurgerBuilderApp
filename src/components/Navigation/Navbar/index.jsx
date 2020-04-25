import React from 'react';

import { StyledNavbar } from './styles';

import NavItems from '../NavItems';

const Toolbar = props => {
	return (
		<StyledNavbar>
			<NavItems isAuth={props.isAuth} />
		</StyledNavbar>
	);
};

export default Toolbar;
