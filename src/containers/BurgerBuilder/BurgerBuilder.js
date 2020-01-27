import React, {Component, Fragment} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../utils/ErrorHandler';
import Axios from '../../utils/Axios';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.8,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        Axios.get('/ingredients.json').then(res => {
            this.setState({ingredients: res.data});
        }).catch(err => {
            console.error('Couldn\'t load information from server.');
            this.setState({ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            }});
        });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientsHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSub = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSub;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Lucas',
                email: 'lucas@email.com'
            }
        }
        Axios.post('/orders.json', order).then(res => {
            this.setState({loading: false, purchasing: false});
            if(res && res.request.status === 200) alert('Pedido feito com sucesso!');
        }).catch(err => {
            this.setState({loading: false, purchasing: false});
            console.log(err);
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientsHandler}
                        removeIngredient={this.removeIngredientsHandler}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                    />
                </Fragment>
            );
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice} />;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return(
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }

}

export default ErrorHandler(BurgerBuilder, Axios);