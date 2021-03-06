import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import Axios from '../../../utils/Axios';
import withErrorHandler from '../../../utils/withErrorHandler';
import Input from '../../../components/UI/Input';

import { purchaseBurger } from '../../../store/actions/order';

import { updateObject } from '../../../utils/updateObject';
import { validationHandler } from '../../../utils/validationHandler';
import * as Routes from '../../../utils/routes';

import { StyledCheckout } from './styles';

const CheckoutInfo = props => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				label: 'Name:',
				placeholder: 'Name',
			},
			value: '',
			validation: {
				required: true,
				invalidMessage: 'This field cannot be empty.',
				valid: false,
			},
			touched: false,
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				label: 'Email:',
				placeholder: 'Email',
			},
			value: '',
			validation: {
				required: true,
				invalidMessage: 'This field cannot be empty.',
				valid: false,
			},
			touched: false,
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				label: 'Street:',
				placeholder: 'Street',
			},
			value: '',
			validation: {
				required: true,
				invalidMessage: 'This field cannot be empty.',
				valid: false,
			},
			touched: false,
		},
		cep: {
			elementType: 'input',
			elementConfig: {
				type: 'number',
				label: 'CEP:',
				placeholder: 'CEP',
			},
			value: '',
			validation: {
				required: true,
				invalidMessage:
					'This field cannot be empty, must only contain numbers and must have 8 characters.',
				minLength: 8,
				maxLength: 8,
				valid: false,
			},
			touched: false,
		},
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const ingredients = useSelector(state => state.burgerBuilder.ingredients);
	const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
	const loading = useSelector(state => state.order.loading);
	const token = useSelector(state => state.auth.token);
	const userId = useSelector(state => state.auth.userId);

	const dispatch = useDispatch();

	const onOrderBurger = (orderData, token) =>
		dispatch(purchaseBurger(orderData, token));

	const orderHandler = event => {
		event.preventDefault();
		const formData = {};
		for (const formElement in orderForm) {
			formData[formElement] = orderForm[formElement].value;
		}
		const order = {
			ingredients: ingredients,
			price: totalPrice,
			orderData: formData,
			userId: userId,
		};

		onOrderBurger(order, token);
	};

	const inputChangedHandler = (event, id) => {
		const updatedElement = updateObject(orderForm[id], {
			value: event.target.value,
			validation: updateObject(orderForm[id].validation, {
				valid: validationHandler(
					event.target.value,
					orderForm[id].validation
				),
			}),
			touched: true,
		});
		const updatedOrderForm = updateObject(orderForm, {
			[id]: updatedElement,
		});

		let formIsValid = true;
		for (const element in updatedOrderForm) {
			if (updatedOrderForm[element].validation)
				formIsValid =
					updatedOrderForm[element].validation.valid &&
					formIsValid === true;
		}
		setOrderForm(updatedOrderForm);
		setIsFormValid(formIsValid);
	};

	const elementsArray = [];
	for (const key in orderForm) {
		elementsArray.push({
			id: key,
			config: orderForm[key],
		});
	}

	let form = (
		<form>
			{elementsArray.map(element => (
				<Input
					key={element.id}
					type={element.config.elementType}
					name={element.id}
					placeholder={element.config.elementConfig.placeholder}
					label={element.config.elementConfig.label}
					value={element.config.value}
					invalid={!element.config.validation.valid}
					touched={element.config.touched}
					shouldValidate={element.config.validation}
					invalidMessage={element.config.validation.invalidMessage}
					onChange={event => inputChangedHandler(event, element.id)}
				/>
			))}
			<Button type='success' click={orderHandler} disabled={!isFormValid}>
				Finish order
			</Button>
			<Button
				type='danger'
				click={() => props.history.replace(Routes.HOME)}
			>
				Cancel
			</Button>
		</form>
	);

	if (loading) form = <Spinner />;

	return (
		<StyledCheckout>
			<div className='container'>
				<h4>Enter your information:</h4>
				{form}
			</div>
		</StyledCheckout>
	);
};

export default withErrorHandler(CheckoutInfo, Axios);
