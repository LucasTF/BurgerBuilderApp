import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../utils/Axios';
import Input from '../../components/UI/Input/Input';

import './CheckoutInfo.css';

class CheckoutInfo extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Name:',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Email:',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Street:',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            },
            cep: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    label: 'CEP:',
                    placeholder: 'CEP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 8,
                    valid: false
                }
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (const formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        Axios.post('/orders.json', order).then(res => {
            this.setState({loading: false});
            if(res && res.request.status === 200) alert('Pedido feito com sucesso!');
            this.props.history.push('/');
        }).catch(err => {
            this.setState({loading: false});
            console.log(err);
        });
    }

    inputChangedHandler = (event, id) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[id] };
        updatedElement.value = event.target.value;
        updatedElement.validation.valid = this.validationHandler(updatedElement.value, updatedElement.validation);
        updatedOrderForm[id] = updatedElement;
        console.log(updatedElement.validation);
        this.setState({orderForm : updatedOrderForm});
    }

    validationHandler = (value, rules) => {
        let isValid = true;

        if(rules.required) isValid = value.trim() !== '';
        if(isValid && rules.minLength) isValid = value.length >= rules.minLength;
        if(isValid && rules.maxLength) isValid = value.length <= rules.maxLength;

        return isValid;
    }

    render(){
        const elementsArray = [];
        for (const key in this.state.orderForm) {
            elementsArray.push({
                id: key,
                config: this.state.orderForm[key]
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
                    onChange={(event) => this.inputChangedHandler(event, element.id)}
                    />
                ))}
                <Button type='success' click={this.orderHandler} >Finish order</Button>
                <Button type='danger' click={this.props.cancelOrder} >Cancel</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className='checkout-info'>
                <h4>Enter your information:</h4>
                {form}
            </div>
        );
    }

}

export default CheckoutInfo;