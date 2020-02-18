import React from 'react';

import Ingredient from './Ingredients/Ingredient';

import './Burger.css';

const Burger = props => {
    let ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <Ingredient key={igKey + index} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients.</p>;
    }
    return (
        <div className='burger'>
            <Ingredient type='bread-top' />
            {ingredients}
            <Ingredient type='bread-bottom' />
        </div>
    );
};

export default Burger;
