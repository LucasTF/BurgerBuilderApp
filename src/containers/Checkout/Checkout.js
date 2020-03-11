import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Summary from '../../components/Order/Summary/Summary';
import CheckoutInfo from './CheckoutInfo';

import './Checkout.css';

const Checkout = props => {
    let summary = <Redirect to='/' />;
    if (props.ingredients) {
        const purchased = props.purchased ? <Redirect to='/' /> : null;
        summary = (
            <div className='checkout'>
                {purchased}
                <Summary ingredients={props.ingredients} />
                <CheckoutInfo
                    ingredients={props.ingredients}
                    totalPrice={props.totalPrice}
                    {...props}
                />
            </div>
        );
    }
    return summary;
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);
