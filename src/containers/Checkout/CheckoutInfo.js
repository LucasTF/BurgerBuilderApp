import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../utils/Axios';
import Input from '../../components/UI/Input/Input';

import './CheckoutInfo.css';

class CheckoutInfo extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            cep: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Lucas',
                email: 'lucas@email.com'
            }
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

    render(){
        /*let form = (
            <form>
                <label>Name:</label>
                <input type='text' name='name' placeholder='Name' />
                <label>Email:</label>
                <input type='email' name='email' placeholder='Email' />
                <label>Street:</label>
                <input type='text' name='street' placeholder='Street address' />
                <label>CEP:</label>
                <input type='text' name='cep' placeholder='CEP' />
                <Button type='success' click={this.orderHandler} >Finish order</Button>
                <Button type='danger' click={this.props.cancelOrder} >Cancel</Button>
            </form>
        );*/
        let form = (
            <form>
                <Input type='text' name='name' placeholder='Name' label='Name:' />
                <Input type='text' name='email' placeholder='Email' label='Email:' />
                <Input type='text' name='street' placeholder='Street' label='Street:' />
                <Input type='text' name='cep' placeholder='CEP' label='CEP:' />
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