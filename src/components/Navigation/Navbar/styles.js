import styled from 'styled-components';

export const StyledNavbar = styled.nav`
	background: #703b09;
	height: 100vh;
	width: 5rem;
	position: fixed;
	transition: width 600ms ease;

	:hover {
		width: 16rem;

		ul {
			li.nav-item {
				a {
					:hover {
						background: #632f07;
					}
				}
				span.link-text {
					display: block;
				}
			}
		}
	}
`;
