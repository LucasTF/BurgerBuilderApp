import styled from 'styled-components';

export const StyledBuildControls = styled.section`
	background: #cf8f2e;
	display: flex;
	padding: 0 2rem;
	align-items: center;

	div.container {
		text-align: center;

		button.order-button {
			background-color: #dad735;
			outline: none;
			cursor: pointer;
			border: 1px solid #966909;
			color: #966909;
			font-family: inherit;
			font-size: 1.2em;
			padding: 15px 30px;
			box-shadow: 2px 2px 2px #966909;

			:hover,
			:active {
				background-color: #a0db41;
				border: 1px solid #966909;
				color: #966909;
			}

			:disabled {
				background-color: #c7c6c6;
				cursor: not-allowed;
				border: 1px solid #ccc;
				color: #888888;
			}

			:not(:disabled) {
				animation: enable 0.3s linear;
			}

			@keyframes enable {
				0% {
					transform: scale(1);
				}
				60% {
					transform: scale(1.1);
				}
				100% {
					transform: scale(1);
				}
			}
		}
	}
`;
