import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Axios from '../../utils/Axios';
import ErrorHandler from '../../utils/ErrorHandler';
import { fetchOrders } from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Orders.css';

class Orders extends Component {
    componentDidMount = () => {
        this.props.onFetchOrders();
    };

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                );
            });
        }
        return <div className='orders'>{orders}</div>;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(fetchOrders()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorHandler(Orders, Axios));
