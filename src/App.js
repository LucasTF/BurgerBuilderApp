import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Contact from './containers/Checkout/Contact/Contact';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Auth/Logout';

import { authCheckState } from './store/actions/auth';

function App(props) {
	useEffect(() => {
		props.onTryAutoLogin();
	}, [props]);

	let routes = (
		<Switch>
			<Route path='/contact' component={Contact} />
			<Route path='/auth' component={Auth} />
			<Route path='/' component={BurgerBuilder} />
		</Switch>
	);
	if (props.isAuth) {
		routes = (
			<Switch>
				<Route path='/contact' component={Contact} />
				<Route path='/checkout' component={Checkout} />
				<Route path='/orders' component={Orders} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' component={Auth} />
				<Route path='/' component={BurgerBuilder} />
			</Switch>
		);
	}

	return (
		<BrowserRouter>
			<Layout>{routes}</Layout>
		</BrowserRouter>
	);
}

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
