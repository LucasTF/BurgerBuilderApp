import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import Axios from '../../utils/Axios';
import ErrorHandler from '../../utils/ErrorHandler';

import './Orders.css';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount = () => {
        Axios.get('/orders.json').then(res => {
            const fetched = [];
            for(let key in res.data){
                fetched.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({orders: fetched,loading: false});
        }).catch(err => {
            this.setState({loading: false});
        })
    }

    render(){
        return(
            <div className='orders'>
                {this.state.orders.map(order => {
                    return (
                    <Order
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price}
                    />);
                })}
            </div>
        )
    }
}

export default ErrorHandler(Orders, Axios);