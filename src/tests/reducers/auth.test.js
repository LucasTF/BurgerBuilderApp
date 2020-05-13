import reducer from '../../store/reducers/auth';
import * as Action from '../../store/actions/actionTypes';
import * as Routes from '../../utils/routes';

describe('Auth Reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirect: Routes.HOME,
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
					authRedirect: Routes.HOME,
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
			authRedirect: Routes.HOME,
		});
	});
});
