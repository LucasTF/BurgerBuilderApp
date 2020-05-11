import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import Spinner from './components/UI/Spinner';

import { authCheckState } from './store/actions/auth';
import { GlobalStyle } from './styles/global';

const Checkout = React.lazy(() => {
	return import('./containers/Checkout');
});

const Orders = React.lazy(() => {
	return import('./containers/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth');
});

const App = props => {
	useEffect(() => {
		props.onTryAutoLogin();
	}, [props]);

	let routes = (
		<Switch>
			<Route path={process.env.PUBLIC_URL + '/auth'} render={() => <Auth />} />
			<Route path={process.env.PUBLIC_URL + '/'} component={BurgerBuilder} />
		</Switch>
	);
	if (props.isAuth) {
		routes = (
			<Switch>
				<Route path={process.env.PUBLIC_URL + '/checkout'} render={() => <Checkout />} />
				<Route path={process.env.PUBLIC_URL + '/orders'} render={() => <Orders />} />
				<Route path={process.env.PUBLIC_URL + '/logout'} component={Logout} />
				<Route path={process.env.PUBLIC_URL + '/auth'} render={() => <Auth />} />
				<Route path={process.env.PUBLIC_URL + '/'} component={BurgerBuilder} />
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

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoLogin: () => dispatch(authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
