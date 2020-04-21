import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import './BuildControls.css';

const controls = [
	{ id: 1, label: 'Salad', type: 'salad' },
	{ id: 2, label: 'Bacon', type: 'bacon' },
	{ id: 3, label: 'Cheese', type: 'cheese' },
	{ id: 4, label: 'Meat', type: 'meat' },
];

const BuildControls = props => {
	return (
		<div className='build-controls'>
			<p>
				Total Price: <strong>${props.totalPrice.toFixed(2)}</strong>
			</p>
			{controls.map(ctrl => (
				<BuildControl
					key={ctrl.id}
					label={ctrl.label}
					remove={() => props.removeIngredient(ctrl.type)}
					added={() => props.ingredientAdded(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
			<button
				className='order-button'
				disabled={!props.purchasable}
				onClick={props.ordered}
			>
				{props.isAuth ? 'Order Now!' : 'Sign In to Purchase!'}
			</button>
		</div>
	);
};

export default BuildControls;
