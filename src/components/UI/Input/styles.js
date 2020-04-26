import styled from 'styled-components';

export const StyledInput = styled.div`
	padding: 0.5rem;

	label.label {
		margin: 0.2rem -0.5rem;
		padding: 0.5rem;
		font-weight: bold;
		color: white;
		text-align: left;
		display: block;
	}

	.input-element.invalid {
		border-color: red;
		background: #700909ac;
	}

	.input-element {
		padding: 0.5rem;
		border-radius: 3px;
		border-style: solid;
		border-color: #703b09;
		background: #703b09ac;
		color: white;
		font: inherit;
		width: 100%;

		:focus {
			outline: none;
			background: #ac6c30e7;
		}
	}

	p.invalid {
		margin: 0 0;
		padding: 5px 0 0 0;
		color: var(--txt-secondary);
		text-align: left;
	}
`;
