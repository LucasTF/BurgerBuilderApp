import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

import * as actions from '../../store/actions/auth';
import * as Routes from '../../utils/routes';

import { updateObject } from '../../utils/updateObject';
import { validationHandler } from '../../utils/validationHandler';

import { StyledAuth } from './styles';

const Auth = () => {
	const [controls, setControls] = useState({
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
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				label: 'Password:',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 6,
				invalidMessage:
					'This field must be at least 6 characters long.',
				valid: false,
			},
			touched: false,
		},
		confirmPassword: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				label: 'Confirm Password:',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 6,
				matches: 'password',
				invalidMessage: "This field must match the 'Password' field.",
				valid: false,
			},
			signUpOnly: true,
			touched: false,
		},
	});

	const [isSignIn, setIsSignIn] = useState(true);

	const dispatch = useDispatch();

	const onAuth = (email, password, confirmPassword, isSignIn) =>
		dispatch(actions.auth(email, password, confirmPassword, isSignIn));
	const onSetAuthRedirect = useCallback(
		() => dispatch(actions.setAuthRedirectPath(Routes.HOME)),
		[dispatch]
	);

	const loading = useSelector(state => state.auth.loading);
	const error = useSelector(state => state.auth.error);
	const isAuth = useSelector(state => state.auth.token !== null);
	const building = useSelector(state => state.burgerBuilder.bulding);
	const authRedirect = useSelector(state => state.auth.authRedirect);

	useEffect(() => {
		if (building && authRedirect !== '/') onSetAuthRedirect();
	}, [building, authRedirect, onSetAuthRedirect]);

	const switchAuthMode = () => {
		setIsSignIn(prevState => !prevState);
	};

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(controls, {
			[controlName]: updateObject(controls[controlName], {
				value: event.target.value,
				validation: updateObject(controls[controlName].validation, {
					valid:
						validationHandler(
							event.target.value,
							controls[controlName].validation
						) &&
						passwordMatchingHandler(
							event.target.value,
							controls[controlName]
						),
				}),
				touched: true,
			}),
		});
		setControls(updatedControls);
	};

	const passwordMatchingHandler = (value, input) => {
		if (input.validation.matches) {
			return value === controls[input.validation.matches].value;
		}
		return true;
	};

	const submitHandler = event => {
		event.preventDefault();
		onAuth(
			controls.email.value,
			controls.password.value,
			controls.confirmPassword.value,
			isSignIn
		);
	};

	const elementsArray = [];
	for (const key in controls) {
		elementsArray.push({
			id: key,
			config: controls[key],
		});
	}

	let form = elementsArray.map(element => {
		if (element.config.signUpOnly && isSignIn) return null;
		return (
			<Input
				key={element.id}
				elementType={element.config.elementType}
				type={element.config.elementConfig.type}
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
		);
	});

	if (loading) form = <Spinner />;

	let errorMessage = null;
	if (error) errorMessage = <p className='error-msg'>{error}</p>;

	let authRedirectView = null;
	if (isAuth) authRedirectView = <Redirect to={authRedirect} />;

	return (
		<StyledAuth>
			<div className='container'>
				{loading ? (
					form
				) : (
					<>
						{authRedirectView}
						{errorMessage}
						<form onSubmit={event => submitHandler(event)}>
							{form}
							<Button type='success'>Submit</Button>
						</form>
						<Button type='info' click={switchAuthMode}>
							{isSignIn
								? 'Create an account'
								: 'Already have an account? Sign in'}
						</Button>
					</>
				)}
			</div>
		</StyledAuth>
	);
};

export default Auth;
