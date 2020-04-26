import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHamburger, FaAngleDoubleRight, FaList } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
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
				<NavLink exact to='/'>
					<div>
						<FaHamburger />
					</div>
					<span className='link-text'>Builder</span>
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink to='/contact'>
					<div>
						<MdEmail />
					</div>
					<span className='link-text'>Contact</span>
				</NavLink>
			</li>
			{!isAuth ? null : (
				<li className='nav-item'>
					<NavLink to='/orders'>
						<div>
							<FaList />
						</div>
						<span className='link-text'>My Orders</span>
					</NavLink>
				</li>
			)}
			<li className='nav-item'>
				{!isAuth ? (
					<NavLink to='/auth'>
						<div>
							<FiLogIn />
						</div>
						<span className='link-text'>Login</span>
					</NavLink>
				) : (
					<NavLink to='/logout'>
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
