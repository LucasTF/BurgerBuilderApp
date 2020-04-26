import styled from 'styled-components';

export const StyledBurger = styled.section`
	width: 100%;
	background: var(--bg-primary);
	color: #222;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: bold;

	div.container {
		background: var(--bg-tertiary);
		border-radius: 10px;
		width: 50%;
		height: 70%;
		margin: auto;
		padding: 1rem;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-direction: column;
	}

	@media (max-width: 1300px) {
		div.container {
			height: 100%;
			width: 100%;
			border-radius: unset;
			background: var(--bg-tertiary);
		}
	}

	@media (max-width: 1100px) {
		height: 100%;
	}
`;
