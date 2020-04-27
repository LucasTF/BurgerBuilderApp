import styled from 'styled-components';

export const StyledCheckout = styled.div`
	background: var(--bg-secondary);
	display: flex;
	padding: 0 2rem;
	flex-direction: column;
	align-items: center;
	max-width: 28rem;

	div.container {
		width: 100%;
		margin: auto 5rem;
		padding: 1rem 0;
		display: flex;
		flex-direction: column;

		h4 {
			text-align: center;
			color: var(--txt-secondary);
			color: var(--txt-secondary);
		}

		button {
			width: 10rem;
			align-self: center;
			margin-top: 1rem;
		}

		form {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin: 0.5rem 0;
		}
	}

	@media (max-width: 1100px) {
		height: 100%;
		max-width: 100%;
		overflow: scroll;
	}
`;
