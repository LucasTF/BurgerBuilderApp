import * as Action from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            };
        case Action.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case Action.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            };
        case Action.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
