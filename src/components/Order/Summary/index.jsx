import React from 'react';

import Burger from '../../Burger';

import './Summary.css';

const Summary = props => {
	return (
		<div className='summary'>
			<h1>Thank you for your order!</h1>
			<div className='burger'>
				<Burger ingredients={props.ingredients} />
			</div>
		</div>
	);
};

export default Summary;
