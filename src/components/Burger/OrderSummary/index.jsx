import React, { Component, Fragment } from 'react';

import Button from '../../UI/Button';

import './OrderSummary.css';

class OrderSummary extends Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			igKey => {
				return (
					<li key={igKey}>
						<span className='order-summary'>{igKey}</span> :{' '}
						{this.props.ingredients[igKey]}
					</li>
				);
			}
		);
		return (
			<Fragment>
				<h3>Your Order</h3>
				<ul>{ingredientSummary}</ul>
				<p>
					Total Price:{' '}
					<strong>${this.props.totalPrice.toFixed(2)}</strong>
				</p>
				<p>Continue to Check Out?</p>
				<div className='btn-div'>
					<Button click={this.props.purchaseCanceled} type='danger'>
						Cancel
					</Button>
					<Button click={this.props.purchaseContinued} type='success'>
						Continue
					</Button>
				</div>
			</Fragment>
		);
	}
}

export default OrderSummary;
