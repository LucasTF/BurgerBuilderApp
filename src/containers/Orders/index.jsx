import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order';
import Axios from '../../utils/Axios';
import withErrorHandler from '../../utils/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner';

import { StyledOrders } from './styles';

const Orders = ({ orders, loading, onFetchOrders, token, userId }) => {
	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let ordersView = <Spinner />;

	if (!loading) {
		ordersView = orders.map(order => {
			return (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			);
		});
	}

	return <StyledOrders>{ordersView}</StyledOrders>;
};

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, Axios));
