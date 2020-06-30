import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Action from '../../../store/actions/actionTypes';
import * as Routes from '../../../utils/routes';
import { logout } from '../../../store/actions/auth';

const Logout = () => {
	const dispatch = useDispatch();

	const onLogout = useCallback(() => dispatch(logout(Action.AUTH_LOGOUT)), [
		dispatch,
	]);

	useEffect(() => {
		onLogout();
	}, [onLogout]);

	return <Redirect to={Routes.HOME} />;
};

export default Logout;
