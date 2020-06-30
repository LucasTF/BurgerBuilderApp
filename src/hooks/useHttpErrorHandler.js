import { useState, useEffect } from 'react';

export const useHttpErrorHandler = axios => {
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
	}, [axios, reqInterceptor, resInterceptor]);

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [error, errorConfirmedHandler];
};
