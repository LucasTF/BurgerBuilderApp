import React from 'react';

import { StyledOrder } from './styles';

const Order = props => {
	const ingredients = [];
	for (let ingredient in props.ingredients) {
		ingredients.push({
			name: ingredient,
			amount: props.ingredients[ingredient],
		});
	}
	const output = ingredients.map(igKey => {
		return (
			<span key={igKey.name}>
				{igKey.name} ({igKey.amount}){' '}
			</span>
		);
	});

	return (
		<StyledOrder>
			<p>
				Ingredients: <strong>{output}</strong>
			</p>
			<p>
				Price:{' '}
				<strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</StyledOrder>
	);
};

export default Order;
