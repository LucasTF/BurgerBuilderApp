import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItems.css';

const NavItems = ({ isAuth }) => {
	return (
		<ul className='nav-items'>
			<li className='nav-item'>
				<NavLink exact to='/'>
					Builder
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink to='/contact'>Contact</NavLink>
			</li>
			<li className='nav-item'>
				{!isAuth ? null : <NavLink to='/orders'>My Orders</NavLink>}
			</li>
			<li className='nav-item'>
				{!isAuth ? (
					<NavLink to='/auth'>Login</NavLink>
				) : (
					<NavLink to='/logout'>Logout</NavLink>
				)}{' '}
			</li>
		</ul>
	);
};

export default NavItems;
