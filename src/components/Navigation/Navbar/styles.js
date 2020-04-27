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
			li.logo {
				transform: rotate(-180deg);
			}
			li.nav-item {
				a {
					:hover {
						background: #632f07;
					}
					span.link-text {
						display: block;
					}
				}
			}
		}
	}

	@media (max-width: 1100px) {
		width: 100vw;
		height: 5rem;
		bottom: 0;
		transition: none;

		ul {
			li.nav-item {
				a {
					span.link-text {
						display: block;
					}
				}
			}
		}

		:hover {
			width: 100vw;
		}
	}

	@media (max-width: 700px) {
		ul {
			li.nav-item {
				a {
					span.link-text {
						display: none;
					}
					div {
						margin: 0 auto;
					}
				}
			}
		}

		:hover {
			ul {
				li.nav-item {
					a {
						span.link-text {
							display: none;
						}
					}
				}
			}
		}
	}
`;
