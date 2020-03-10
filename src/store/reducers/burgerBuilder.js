import * as Action from '../actions/actionTypes';
import { updateObject } from '../utils/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.8,
    bacon: 0.6,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.ADD_INGREDIENT:
            return updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1,
                },
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            });
        case Action.REMOVE_INGREDIENT:
            return updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1,
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            });
        case Action.SET_INGREDIENTS:
            const calculatedTotalPrice =
                action.ingredients.salad * INGREDIENT_PRICES['salad'] +
                action.ingredients.bacon * INGREDIENT_PRICES['bacon'] +
                action.ingredients.cheese * INGREDIENT_PRICES['cheese'] +
                action.ingredients.meat * INGREDIENT_PRICES['meat'];
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: state.totalPrice + calculatedTotalPrice,
                error: false,
            });
        case Action.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;
