import React from 'react'

import './Order.css'

const Order = props => {

    const ingredients = [];
    for(let ingredient in props.ingredients){
        ingredients.push({name: ingredient, amount: props.ingredients[ingredient]});
    }
    const output = ingredients.map(igKey => {
        return <span key={igKey.name}>{igKey.name} ({igKey.amount}) </span>;
    })

    return(
        <div className='order'>
            <p>Ingredients: <strong>{output}</strong></p>
            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;