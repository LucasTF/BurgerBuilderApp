import React from 'react';

import './Toolbar.css';

import Logo from '../../Logo';
import NavItems from '../NavItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle';

const Toolbar = props => {
	return (
		<header className='toolbar'>
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<Logo title='BurgerBuilder' />
			<nav className='desktop-only'>
				<NavItems isAuth={props.isAuth} />
			</nav>
		</header>
	);
};

export default Toolbar;
