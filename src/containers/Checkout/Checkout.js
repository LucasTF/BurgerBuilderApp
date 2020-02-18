import React from 'react';
import { connect } from 'react-redux';

import Summary from '../../components/Order/Summary/Summary';
import CheckoutInfo from './CheckoutInfo';

import './Checkout.css';

const Checkout = props => {
    return (
        <div className='checkout'>
            <Summary ingredients={props.ingredients} />
            <CheckoutInfo
                ingredients={props.ingredients}
                totalPrice={props.totalPrice}
                {...props}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

export default connect(mapStateToProps)(Checkout);
