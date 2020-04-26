import React from 'react';
import { connect } from 'react-redux';

import { StyledMain } from './styles';

import Navbar from '../Navigation/Navbar';

const Layout = props => {
	return (
		<>
			<Navbar isAuth={props.isAuthenticated} />
			<StyledMain>{props.children}</StyledMain>
		</>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
