import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import './Sidedrawer.css';

const Sidedrawer = props => {
	let sidedrawer = props.open ? 'sidedrawer open' : 'sidedrawer close';

	return (
		<Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={sidedrawer} onClick={props.closed}>
				<Logo title='BurgerBuilder' />
				<nav>
					<NavItems isAuth={props.isAuth} />
				</nav>
			</div>
		</Fragment>
	);
};

export default Sidedrawer;
