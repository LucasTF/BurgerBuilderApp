import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyledMain } from './styles';

import Navbar from '../Navigation/Navbar';

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
			<>
				<Navbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sidedrawerToggleHandler}
				/>
				<StyledMain>{this.props.children}</StyledMain>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
