import React from 'react';
import PropTypes from 'prop-types';

import './Ingredients.css';

const Ingredients = props => {
	let ingredient = null;
	switch (props.type) {
		case 'bread-bottom':
		case 'meat':
		case 'salad':
		case 'cheese':
		case 'bacon':
			ingredient = <div className={props.type}></div>;
			break;
		case 'bread-top':
			ingredient = (
				<div className={props.type}>
					<div className='seeds1'></div>
					<div className='seeds2'></div>
				</div>
			);
			break;
		default:
			ingredient = null;
			break;
	}
	return ingredient;
};

Ingredients.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Ingredients;
