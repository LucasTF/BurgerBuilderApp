import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar';
import './Layout.css';
import Sidedrawer from '../Navigation/Sidedrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sidedrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sidedrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Fragment>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sidedrawerToggleHandler}
				/>
				<Sidedrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sidedrawerClosedHandler}
				/>
				<main className='content'>{this.props.children}</main>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
