import styled from 'styled-components';

export const StyledMain = styled.main`
	margin-left: 5rem;
	height: 100vh;
	display: flex;

	@media (max-width: 1100px) {
		margin-left: 0;
		padding-bottom: 5rem;
		flex-direction: column-reverse;
	}
`;
