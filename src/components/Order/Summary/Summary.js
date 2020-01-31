import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './Summary.css';

const Summary = props => {
    return (
        <div className='summary'>
            <h1>Thank you for your order!</h1>
            <div className='burger'>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button click={props.checkoutCancelled} type='danger'>Cancel</Button>
            <Button click={props.checkoutContinued} type='success'>Continue</Button>
        </div>
    );
}

export default Summary;