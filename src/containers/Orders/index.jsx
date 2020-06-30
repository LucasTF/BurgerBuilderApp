import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Order from '../../components/Order';
import Axios from '../../utils/Axios';
import withErrorHandler from '../../utils/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner';

import { StyledOrders } from './styles';

const Orders = () => {
	const orders = useSelector(state => state.order.orders);
	const loading = useSelector(state => state.order.loading);
	const token = useSelector(state => state.auth.token);
	const userId = useSelector(state => state.auth.userId);

	const dispatch = useDispatch();

	const onFetchOrders = useCallback(
		(token, userId) => dispatch(fetchOrders(token, userId)),
		[dispatch]
	);

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

export default withErrorHandler(Orders, Axios);
