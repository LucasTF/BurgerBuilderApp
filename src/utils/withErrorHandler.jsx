import React from 'react';

import { useHttpErrorHandler } from '../hooks/useHttpErrorHandler';

import Modal from '../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

		return (
			<>
				<Modal
					title='Error!'
					show={error}
					modalClosed={errorConfirmedHandler}
				>
					{error && 'Something went wrong!'}
				</Modal>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export default withErrorHandler;
