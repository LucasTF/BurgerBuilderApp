import reducer from '../../store/reducers/auth';
import * as Action from '../../store/actions/actionTypes';

describe('Auth Reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirect: process.env.PUBLIC_URL + '/',
		});
	});

	it('should store a token upon login', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirect: process.env.PUBLIC_URL + '/',
				},
				{
					type: Action.AUTH_SUCCESS,
					idToken: 'token',
					userId: 'userId',
				}
			)
		).toEqual({
			token: 'token',
			userId: 'userId',
			error: null,
			loading: false,
			authRedirect: process.env.PUBLIC_URL + '/',
		});
	});
});
