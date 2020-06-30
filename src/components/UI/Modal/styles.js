import styled from 'styled-components';

const StyledModal = styled.div`
	position: fixed;
	z-index: 500;
	background-color: #f2f2f2;
	width: 30%;
	top: 30%;
	border-radius: 12px;
	transition: all 0.3s ease-out;

	&.purchase-true {
		transform: translate(100%, 0);
		opacity: 1;
	}

	&.purchase-false {
		transform: translate(-100vw, 0);
		opacity: 0;
	}

	.title {
		background: #cf8f2e;
		color: #fff;
		font-weight: bold;
		border-radius: 12px 12px 0 0;

		padding: 1rem;
	}

	.content {
		padding: 1rem;
	}

	@media (min-width: 600px) {
		.modal {
			width: 500px;
			left: calc(50% - 250px);
		}
	}
`;

export default StyledModal;
