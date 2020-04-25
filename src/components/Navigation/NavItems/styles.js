import styled from 'styled-components';

export const StyledNavlist = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;

	li.logo {
		margin: 1rem auto;
		height: 2rem;
		div {
			font-size: 2rem;
			color: #cf8f2e;
		}
	}

	li.nav-item {
		width: 100%;

		a {
			display: flex;
			align-items: center;
			height: 5rem;
			color: #cf8f2e;
			text-decoration: none;
			border: none;
			transition: 600ms;

			div {
				margin: 0 1.5rem;
				font-size: 2rem;
			}

			span.link-text {
				display: none;
				min-width: 5rem;
			}
		}
	}
`;
