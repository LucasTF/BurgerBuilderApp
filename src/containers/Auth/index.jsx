import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

import * as actions from '../../store/actions/auth';

import { updateObject } from '../../utils/updateObject';
import { validationHandler } from '../../utils/validationHandler';

import './styles.css';

class Auth extends Component {
	state = {
		controls: {
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
		},
		isSignIn: true,
	};

	componentDidMount() {
		if (this.props.building && this.props.authRedirect !== '/') {
			this.props.onSetAuthRedirect();
		}
	}

	switchAuthMode = () => {
		this.setState(prevState => {
			return {
				isSignIn: !prevState.isSignIn,
			};
		});
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				validation: updateObject(
					this.state.controls[controlName].validation,
					{
						valid: validationHandler(
							event.target.value,
							this.state.controls[controlName].validation
						),
					}
				),
				touched: true,
			}),
		});
		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignIn
		);
	};

	render() {
		const elementsArray = [];
		for (const key in this.state.controls) {
			elementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = elementsArray.map(element => {
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
					onChange={event =>
						this.inputChangedHandler(event, element.id)
					}
				/>
			);
		});

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p className='error-msg'>{this.props.error}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuth) {
			authRedirect = <Redirect to={this.props.authRedirect} />;
		}

		return (
			<div className='login-form'>
				{authRedirect}
				{errorMessage}
				<form onSubmit={event => this.submitHandler(event)}>
					{form}
					<Button type='success'>Submit</Button>
				</form>
				<Button type='danger' click={this.switchAuthMode}>
					{this.state.isSignIn
						? 'Create an account'
						: 'Already have an account? Sign in'}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		building: state.burgerBuilder.bulding,
		authRedirect: state.auth.authRedirect,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignIn) =>
			dispatch(actions.auth(email, password, isSignIn)),
		onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
