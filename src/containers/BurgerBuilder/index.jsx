import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BurgerPage from '../../components/BurgerPage';
import BuildControls from '../../components/BurgerPage/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/BurgerPage/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../utils/withErrorHandler';
import * as Routes from '../../utils/routes';
import Axios from '../../utils/Axios';
import {
	addIngredient,
	removeIngredient,
	initIngredients,
} from '../../store/actions/burgerBuilder';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { purchaseInit } from '../../store/actions/order';

export const BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);

	const dispatch = useDispatch();

	const onIngredientAdded = ingredient => dispatch(addIngredient(ingredient));
	const onIngredientRemoved = ingredient =>
		dispatch(removeIngredient(ingredient));
	const onInitIngredients = useCallback(() => dispatch(initIngredients()), [
		dispatch,
	]);
	const onInitPurchase = () => dispatch(purchaseInit());
	const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path));

	const ingredients = useSelector(state => state.burgerBuilder.ingredients);
	const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
	const error = useSelector(state => state.burgerBuilder.error);
	const isAuth = useSelector(state => state.auth.token !== null);

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = ings => {
		const sum = Object.keys(ings)
			.map(igKey => {
				return ings[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (isAuth) {
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath(Routes.CHECKOUT);
			props.history.push(Routes.AUTH);
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push(Routes.CHECKOUT);
	};

	const disabledInfo = {
		...ingredients,
	};
	for (let i in disabledInfo) {
		disabledInfo[i] = disabledInfo[i] <= 0;
	}
	let orderSummary = null;
	let burger = error ? <p>Ingredients can't be loaded.</p> : <Spinner />;
	if (ingredients) {
		burger = (
			<>
				<BuildControls
					ingredientAdded={onIngredientAdded}
					removeIngredient={onIngredientRemoved}
					totalPrice={totalPrice}
					purchasable={updatePurchaseState(ingredients)}
					isAuth={isAuth}
					ordered={purchaseHandler}
					disabled={disabledInfo}
				/>
				<BurgerPage ingredients={ingredients} />
			</>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ingredients}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				totalPrice={totalPrice}
			/>
		);
	}

	return (
		<>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</>
	);
};

export default withErrorHandler(BurgerBuilder, Axios);
