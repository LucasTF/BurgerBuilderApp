import React, { useState, useEffect } from 'react';

import Modal from '../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, setError] = useState();

		const reqInterceptor = axios.interceptors.request.use(req => {
			setError(null);
			return req;
		});
		const resInterceptor = axios.interceptors.response.use(
			res => res,
			err => {
				setError(err);
			}
		);

		useEffect(() => {
			return () => {
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(resInterceptor);
			};
		}, [reqInterceptor, resInterceptor]);

		const errorConfirmedHandler = () => {
			setError(null);
		};

		return (
			<>
				<Modal show={error} modalClosed={errorConfirmedHandler}>
					{error && 'Somethin went wrong!'}
				</Modal>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export default withErrorHandler;
