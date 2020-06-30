import React, { useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import Spinner from './components/UI/Spinner';

import { authCheckState } from './store/actions/auth';
import { GlobalStyle } from './styles/global';

import * as Routes from './utils/routes';

const Checkout = React.lazy(() => {
	return import('./containers/Checkout');
});

const Orders = React.lazy(() => {
	return import('./containers/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth');
});

const App = () => {
	const dispatch = useDispatch();

	const onTryAutoLogin = useCallback(() => dispatch(authCheckState()), [
		dispatch,
	]);

	const isAuth = useSelector(state => state.auth.token !== null);

	useEffect(() => {
		onTryAutoLogin();
	}, [onTryAutoLogin]);

	let routes = (
		<Switch>
			<Route path={Routes.AUTH} render={() => <Auth />} />
			<Route path={Routes.HOME} component={BurgerBuilder} />
		</Switch>
	);
	if (isAuth) {
		routes = (
			<Switch>
				<Route path={Routes.CHECKOUT} render={() => <Checkout />} />
				<Route path={Routes.ORDERS} render={() => <Orders />} />
				<Route path={Routes.LOGOUT} component={Logout} />
				<Route path={Routes.AUTH} render={() => <Auth />} />
				<Route default path={Routes.HOME} component={BurgerBuilder} />
				<Route component={BurgerBuilder} />
			</Switch>
		);
	}

	return (
		<BrowserRouter>
			<Layout>
				<Suspense fallback={<Spinner />}>{routes}</Suspense>
			</Layout>
			<GlobalStyle />
		</BrowserRouter>
	);
};

export default App;
