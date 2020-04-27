import styled from 'styled-components';

export const StyledBurger = styled.div`
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

	@media (max-width: 1300px) {
		height: 100%;
		width: 100%;
		border-radius: unset;
		background: var(--bg-tertiary);
	}
`;
