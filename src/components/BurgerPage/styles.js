import styled from 'styled-components';

export const StyledBurgerPage = styled.section`
	width: 100%;
	background: var(--bg-primary);
	color: #222;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: bold;

	@media (max-width: 1100px) {
		height: 100%;
	}
`;
