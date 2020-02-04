import React, {Component} from 'react';

import Summary from '../../components/Order/Summary/Summary';
import CheckoutInfo from './CheckoutInfo';

import './Checkout.css';

class Checkout extends Component {
    
    state = {
        ingredients : null,
        totalPrice: 0
    }

    constructor(props){
        super(props);
        const query = new URLSearchParams(props.location.search);
        const ingredientsQuery = {};
        let priceQuery = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                priceQuery = param[1];
            }
            else{
                ingredientsQuery[param[0]] = +param[1];
            }
        }
        this.state = {ingredients: ingredientsQuery, totalPrice: priceQuery};
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div className='checkout' >
                <Summary
                ingredients={this.state.ingredients}
                />
                <CheckoutInfo
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                {...this.props}
                />
            </div>
        );
    }
}

export default Checkout;