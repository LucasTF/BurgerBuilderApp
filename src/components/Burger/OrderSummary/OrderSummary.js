import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

import './OrderSummary.css';

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span className="order-summary">
                    {igKey}
                </span> : {props.ingredients[igKey]}
            </li>);
    });
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Check Out?</p>
            <div className="btn-div">
                <button onClick={props.purchaseCanceled} className="button btn-danger">Cancel</button>
                <button onClick={props.purchaseContinued} className="button btn-success">Continue</button>
            </div>
        </Auxiliary>
    )
}

export default OrderSummary;