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

const Contact = React.lazy(() => {
	return import('./containers/Checkout/Contact');
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
			<Route path='/contact' render={() => <Contact />} />
			<Route path='/auth' render={() => <Auth />} />
			<Route path='/' component={BurgerBuilder} />
		</Switch>
	);
	if (props.isAuth) {
		routes = (
			<Switch>
				<Route path='/contact' render={() => <Contact />} />
				<Route path='/checkout' render={() => <Checkout />} />
				<Route path='/orders' render={() => <Orders />} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' render={() => <Auth />} />
				<Route path='/' component={BurgerBuilder} />
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
