import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHamburger, FaAngleDoubleRight, FaList } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import { StyledNavlist } from './styles';

const NavItems = ({ isAuth }) => {
	return (
		<StyledNavlist>
			<li className='logo'>
				<div>
					<FaAngleDoubleRight />
				</div>
			</li>
			<li className='nav-item'>
				<NavLink exact to={process.env.PUBLIC_URL + '/'}>
					<div>
						<FaHamburger />
					</div>
					<span className='link-text'>Builder</span>
				</NavLink>
			</li>
			{!isAuth ? null : (
				<li className='nav-item'>
					<NavLink to={process.env.PUBLIC_URL + '/orders'}>
						<div>
							<FaList />
						</div>
						<span className='link-text'>My Orders</span>
					</NavLink>
				</li>
			)}
			<li className='nav-item'>
				{!isAuth ? (
					<NavLink to={process.env.PUBLIC_URL + '/auth'}>
						<div>
							<FiLogIn />
						</div>
						<span className='link-text'>Login</span>
					</NavLink>
				) : (
					<NavLink to={process.env.PUBLIC_URL + '/logout'}>
						<div>
							<FiLogOut />
						</div>
						<span className='link-text'>Logout</span>
					</NavLink>
				)}{' '}
			</li>
		</StyledNavlist>
	);
};

export default NavItems;
