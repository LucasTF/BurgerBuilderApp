import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Summary from '../../components/Order/Summary';
import CheckoutInfo from './CheckoutInfo';

import * as Routes from '../../utils/routes';

const Checkout = props => {
	const ingredients = useSelector(state => state.burgerBuilder.ingredients);
	const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
	const purchased = useSelector(state => state.order.purchased);

	let summary = <Redirect to={Routes.HOME} />;
	if (ingredients) {
		const purchasedView = purchased && <Redirect to={Routes.HOME} />;
		summary = (
			<>
				{purchasedView}
				<CheckoutInfo
					ingredients={ingredients}
					totalPrice={totalPrice}
					{...props}
				/>
				<Summary ingredients={ingredients} />
			</>
		);
	}
	return summary;
};

export default Checkout;
