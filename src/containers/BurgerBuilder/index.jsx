import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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

export const BurgerBuilder = ({ onInitIngredients, ...props }) => {
	const [purchasing, setPurchasing] = useState(false);

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuth) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath(Routes.CHECKOUT);
			props.history.push(Routes.AUTH);
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push(Routes.CHECKOUT);
	};

	const disabledInfo = {
		...props.ingredients,
	};
	for (let i in disabledInfo) {
		disabledInfo[i] = disabledInfo[i] <= 0;
	}
	let orderSummary = null;
	let burger = props.error ? (
		<p>Ingredients can't be loaded.</p>
	) : (
		<Spinner />
	);
	if (props.ingredients) {
		burger = (
			<>
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					removeIngredient={props.onIngredientRemoved}
					totalPrice={props.totalPrice}
					purchasable={updatePurchaseState(props.ingredients)}
					isAuth={props.isAuth}
					ordered={purchaseHandler}
					disabled={disabledInfo}
				/>
				<BurgerPage ingredients={props.ingredients} />
			</>
		);
		orderSummary = (
			<OrderSummary
				ingredients={props.ingredients}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				totalPrice={props.totalPrice}
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

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredient => dispatch(addIngredient(ingredient)),
		onIngredientRemoved: ingredient =>
			dispatch(removeIngredient(ingredient)),
		onInitIngredients: () => dispatch(initIngredients()),
		onInitPurchase: () => dispatch(purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, Axios));
