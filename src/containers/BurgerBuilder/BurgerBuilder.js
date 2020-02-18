import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../utils/ErrorHandler';
import Axios from '../../utils/Axios';
import * as Action from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        // Axios.get('/ingredients.json').then(res => {
        //     this.setState({ingredients: res.data});
        // }).catch(err => {
        //     console.error('Couldn\'t load information from server.');
        //     this.setState({ingredients: {
        //         salad: 0,
        //         bacon: 0,
        //         cheese: 0,
        //         meat: 0
        //     }});
        // });
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
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients,
        };
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(
                            this.props.ingredients
                        )}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                    />
                </Fragment>
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
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredient =>
            dispatch({
                type: Action.ADD_INGREDIENT,
                ingredientName: ingredient,
            }),
        onIngredientRemoved: ingredient =>
            dispatch({
                type: Action.REMOVE_INGREDIENT,
                ingredientName: ingredient,
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorHandler(BurgerBuilder, Axios));
