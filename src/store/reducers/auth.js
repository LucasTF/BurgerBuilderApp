import * as Action from '../actions/actionTypes';
import { updateObject } from '../../utils/updateObject';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirect: '/',
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false,
	});
};

const authFailed = (state, action) => {
	return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
	return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, { authRedirect: action.path });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case Action.AUTH_START:
			return authStart(state, action);
		case Action.AUTH_SUCCESS:
			return authSuccess(state, action);
		case Action.AUTH_FAILED:
			return authFailed(state, action);
		case Action.AUTH_LOGOUT:
			return authLogout(state, action);
		case Action.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default reducer;
