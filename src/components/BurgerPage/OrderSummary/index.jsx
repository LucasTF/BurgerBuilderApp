import React from 'react';

import Button from '../../UI/Button';

import StyledOrderSummary from './styles';

const OrderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
		return (
			<tr key={igKey}>
				<td>{igKey}</td>
				<td>{props.ingredients[igKey]}</td>
			</tr>
		);
	});

	return (
		<StyledOrderSummary>
			<table>
				<thead>
					<tr>
						<th>Ingredient</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>{ingredientSummary}</tbody>
			</table>
			<div className='order-info'>
				<p>
					Total Price: <strong>${props.totalPrice.toFixed(2)}</strong>
				</p>
				<p>Continue to Check Out?</p>
			</div>
			<div className='btn-div'>
				<Button click={props.purchaseCanceled} type='danger'>
					Cancel
				</Button>
				<Button click={props.purchaseContinued} type='success'>
					Continue
				</Button>
			</div>
		</StyledOrderSummary>
	);
};

export default OrderSummary;
