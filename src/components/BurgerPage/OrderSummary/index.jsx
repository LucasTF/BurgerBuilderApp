import React from 'react';

import Button from '../../UI/Button';

import './OrderSummary.css';

const OrderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span className='order-summary'>{igKey}</span> :{' '}
				{props.ingredients[igKey]}
			</li>
		);
	});

	return (
		<>
			<ul>{ingredientSummary}</ul>
			<p>
				Total Price: <strong>${props.totalPrice.toFixed(2)}</strong>
			</p>
			<p>Continue to Check Out?</p>
			<div className='btn-div'>
				<Button click={props.purchaseCanceled} type='danger'>
					Cancel
				</Button>
				<Button click={props.purchaseContinued} type='success'>
					Continue
				</Button>
			</div>
		</>
	);
};

export default OrderSummary;
