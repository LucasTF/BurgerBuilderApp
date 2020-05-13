import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Summary from '../../components/Order/Summary';
import CheckoutInfo from './CheckoutInfo';

import * as Routes from '../../utils/routes';

const Checkout = props => {
	let summary = <Redirect to={Routes.HOME} />;
	if (props.ingredients) {
		const purchased = props.purchased ? (
			<Redirect to={Routes.HOME} />
		) : null;
		summary = (
			<>
				{purchased}
				<CheckoutInfo
					ingredients={props.ingredients}
					totalPrice={props.totalPrice}
					{...props}
				/>
				<Summary ingredients={props.ingredients} />
			</>
		);
	}
	return summary;
};

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
