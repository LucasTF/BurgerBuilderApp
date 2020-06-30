import React from 'react';
import { useSelector } from 'react-redux';

import { StyledMain } from './styles';

import Navbar from '../Navigation/Navbar';

const Layout = props => {
	const isAuthenticated = useSelector(state => state.auth.token !== null);

	return (
		<>
			<Navbar isAuth={isAuthenticated} />
			<StyledMain>{props.children}</StyledMain>
		</>
	);
};

export default Layout;
