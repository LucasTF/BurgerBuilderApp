import * as Action from '../actions/actionTypes';
import { updateObject } from '../../utils/updateObject';

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case Action.PURCHASE_INIT:
			return updateObject(state, { purchased: false });
		case Action.PURCHASE_BURGER_START:
			return updateObject(state, { loading: true });
		case Action.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);
		case Action.PURCHASE_BURGER_FAILED:
			return updateObject(state, { loading: false });
		case Action.FETCH_ORDERS_START:
			return updateObject(state, { loading: true });
		case Action.FETCH_ORDERS_SUCCESS:
			return updateObject(state, {
				orders: action.orders,
				loading: false,
			});
		case Action.FETCH_ORDERS_FAILED:
			return updateObject(state, { loading: false });
		default:
			return state;
	}
};

const purchaseBurgerSuccess = (state, action) => {
	const orders = state.orders.concat({
		...action.orderData,
		id: action.orderId,
	});
	return updateObject(state, {
		loading: false,
		purchased: true,
		orders: orders,
	});
};

export default reducer;
