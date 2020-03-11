import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../utils/Axios';
import ErrorHandler from '../../utils/ErrorHandler';
import Input from '../../components/UI/Input/Input';

import { purchaseBurger } from '../../store/actions/order';

import './CheckoutInfo.css';

class CheckoutInfo extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false,
    };

    orderHandler = event => {
        event.preventDefault();
        const formData = {};
        for (const formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
        };

        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, id) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[id] };
        updatedElement.value = event.target.value;
        updatedElement.validation.valid = this.validationHandler(
            updatedElement.value,
            updatedElement.validation
        );
        updatedElement.touched = true;
        updatedOrderForm[id] = updatedElement;

        let formIsValid = true;
        for (const element in updatedOrderForm) {
            if (updatedOrderForm[element].validation)
                formIsValid =
                    updatedOrderForm[element].validation.valid &&
                    formIsValid === true;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        });
    };

    validationHandler = (value, rules) => {
        let isValid = true;

        if (rules.required) isValid = value.trim() !== '';
        if (isValid && rules.minLength)
            isValid = value.length >= rules.minLength;
        if (isValid && rules.maxLength)
            isValid = value.length <= rules.maxLength;

        return isValid;
    };

    render() {
        const elementsArray = [];
        for (const key in this.state.orderForm) {
            elementsArray.push({
                id: key,
                config: this.state.orderForm[key],
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
                        invalidMessage={
                            element.config.validation.invalidMessage
                        }
                        onChange={event =>
                            this.inputChangedHandler(event, element.id)
                        }
                    />
                ))}
                <Button
                    type='success'
                    click={this.orderHandler}
                    disabled={!this.state.formIsValid}
                >
                    Finish order
                </Button>
                <Button
                    type='danger'
                    click={() => this.props.history.replace('/')}
                >
                    Cancel
                </Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className='checkout-info'>
                <h4>Enter your information:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: orderData => dispatch(purchaseBurger(orderData)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorHandler(CheckoutInfo, Axios));
