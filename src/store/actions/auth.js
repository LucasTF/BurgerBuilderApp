import Axios from 'axios';

import * as Action from './actionTypes';

export const authStart = () => {
	return {
		type: Action.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: Action.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFailed = error => {
	return {
		type: Action.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: Action.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: Action.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem('expirationDate')
			);
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};

export const auth = (email, password, confirmPassword, isSignIn) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url;
		if (isSignIn) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLBsHPZFCV6SMwkcRZx3Lvqrd-FabNWxU';
		} else {
			if (password !== confirmPassword) {
				dispatch(authFailed('PASSWORDS_DO_NOT_MATCH'));
				return;
			}
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLBsHPZFCV6SMwkcRZx3Lvqrd-FabNWxU';
		}
		Axios.post(url, authData)
			.then(res => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', res.data.localId);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFailed(err.response.data.error.message));
			});
	};
};
