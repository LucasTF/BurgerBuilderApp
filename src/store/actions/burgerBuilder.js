import * as Action from './actionTypes';
import Axios from '../../utils/Axios';

export const addIngredient = ingName => {
    return {
        type: Action.ADD_INGREDIENT,
        ingredientName: ingName,
    };
};

export const removeIngredient = ingName => {
    return {
        type: Action.REMOVE_INGREDIENT,
        ingredientName: ingName,
    };
};

const setIngredients = ingredients => {
    return {
        type: Action.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

const fetchIngredientsFailed = () => {
    return {
        type: Action.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        Axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                console.error("Couldn't load information from server.");
                dispatch(fetchIngredientsFailed());
            });
    };
};
