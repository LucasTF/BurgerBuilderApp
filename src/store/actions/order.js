import * as Action from './actionTypes';
import Axios from '../../utils/Axios';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: Action.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

const purchaseBurgerFailed = errorMessage => {
	return {
		type: Action.PURCHASE_BURGER_FAILED,
		error: errorMessage,
	};
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		Axios.post('/orders.json?auth=' + token, orderData)
			.then(res => {
				dispatch(purchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch(err => {
				dispatch(purchaseBurgerFailed(err));
			});
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: Action.PURCHASE_BURGER_START,
	};
};

export const purchaseInit = () => {
	return {
		type: Action.PURCHASE_INIT,
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: Action.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFailed = error => {
	return {
		type: Action.FETCH_ORDERS_FAILED,
		error: error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: Action.FETCH_ORDERS_START,
	};
};

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams =
			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		Axios.get('/orders.json' + queryParams)
			.then(res => {
				const fetched = [];
				for (let key in res.data) {
					fetched.push({
						...res.data[key],
						id: key,
					});
				}
				dispatch(fetchOrdersSuccess(fetched));
			})
			.catch(err => {
				dispatch(fetchOrdersFailed(err));
			});
	};
};
