import React, { Component } from 'react';
import { connect } from 'react-redux';

import BurgerPage from '../../components/BurgerPage';
import BuildControls from '../../components/BurgerPage/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/BurgerPage/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../utils/withErrorHandler';
import Axios from '../../utils/Axios';
import {
	addIngredient,
	removeIngredient,
	initIngredients,
} from '../../store/actions/burgerBuilder';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { purchaseInit } from '../../store/actions/order';

export class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	purchaseHandler = () => {
		if (this.props.isAuth) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath(process.env.PUBLIC_URL + '/checkout');
			this.props.history.push(process.env.PUBLIC_URL + '/auth');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push(process.env.PUBLIC_URL + '/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ingredients,
		};
		for (let i in disabledInfo) {
			disabledInfo[i] = disabledInfo[i] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded.</p>
		) : (
			<Spinner />
		);
		if (this.props.ingredients) {
			burger = (
				<>
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						removeIngredient={this.props.onIngredientRemoved}
						totalPrice={this.props.totalPrice}
						purchasable={this.updatePurchaseState(
							this.props.ingredients
						)}
						isAuth={this.props.isAuth}
						ordered={this.purchaseHandler}
						disabled={disabledInfo}
					/>
					<BurgerPage ingredients={this.props.ingredients} />
				</>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					totalPrice={this.props.totalPrice}
				/>
			);
		}
		return (
			<>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

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
