import styled from 'styled-components';

export const StyledBurger = styled.div`
	background: var(--bg-tertiary);
	border-radius: 10px;
	width: 50%;
	height: 70%;
	margin: auto;
	padding: 1rem;
	display: flex;
	box-shadow: inset -0.5rem 0 #b6875b;
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
