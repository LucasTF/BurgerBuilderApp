import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order';
import Axios from '../../utils/Axios';
import withErrorHandler from '../../utils/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner';

import { StyledOrders } from './styles';

class Orders extends Component {
	componentDidMount = () => {
		this.props.onFetchOrders(this.props.token, this.props.userId);
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
		return <StyledOrders>{orders}</StyledOrders>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, Axios));
