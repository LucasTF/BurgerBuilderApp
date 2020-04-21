import React from 'react';

import './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';

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
