import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHamburger, FaAngleDoubleRight, FaList } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import * as Routes from '../../../utils/routes';

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
				<NavLink exact to={Routes.HOME}>
					<div>
						<FaHamburger />
					</div>
					<span className='link-text'>Builder</span>
				</NavLink>
			</li>
			{!isAuth ? null : (
				<li className='nav-item'>
					<NavLink to={Routes.ORDERS}>
						<div>
							<FaList />
						</div>
						<span className='link-text'>My Orders</span>
					</NavLink>
				</li>
			)}
			<li className='nav-item'>
				{!isAuth ? (
					<NavLink to={Routes.AUTH}>
						<div>
							<FiLogIn />
						</div>
						<span className='link-text'>Login</span>
					</NavLink>
				) : (
					<NavLink to={Routes.LOGOUT}>
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
