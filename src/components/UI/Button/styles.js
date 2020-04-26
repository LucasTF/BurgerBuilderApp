import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
	background-color: transparent;
	border-radius: 3px;
	border: 1px solid;
	padding: 8px;
	color: white;
	outline: none;
	cursor: pointer;
	font: inherit;
	font-weight: bold;

	${props =>
		props.className === 'success' &&
		css`
			background-color: #5c9210;
			border-color: rgb(60, 98, 7);

			:hover {
				background-color: rgb(119, 189, 20);
			}

			:disabled {
				background-color: #7e7365;
				border-color: #ccc;
				cursor: not-allowed;
			}
		`}

	:disabled:hover {
		background-color: #ac9980;
	}

	${props =>
		props.className === 'danger' &&
		css`
			background-color: #c63636;
			border-color: #a72b2b;

			:hover {
				background-color: #e11d1d;
			}
		`}

	${props =>
		props.className === 'info' &&
		css`
			background-color: #0e8093;
			border-color: #085667;

			:hover {
				background-color: #13a9be;
			}
		`}
`;
