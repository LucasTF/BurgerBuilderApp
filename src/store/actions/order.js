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

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        Axios.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data);
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
