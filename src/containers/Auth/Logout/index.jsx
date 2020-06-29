import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Action from '../../../store/actions/actionTypes';
import * as Routes from '../../../utils/routes';
import { logout } from '../../../store/actions/auth';

const Logout = ({ onLogout }) => {
	useEffect(() => {
		onLogout();
	}, [onLogout]);

	return <Redirect to={Routes.HOME} />;
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(logout(Action.AUTH_LOGOUT)),
	};
};

export default connect(null, mapDispatchToProps)(Logout);
