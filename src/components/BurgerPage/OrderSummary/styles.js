import styled from 'styled-components';

const StyledOrderSummary = styled.div`
	table {
		border-collapse: collapse;
		width: 100%;

		tr:nth-child(even) {
			background-color: #dddddd;
		}

		td,
		th {
			text-transform: capitalize;
			border: 1px solid #dddddd;
			text-align: left;
			padding: 8px;
		}
	}

	.order-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		margin: 1rem 0;
	}

	.btn-div {
		display: flex;
		flex-direction: row-reverse;
	}
`;

export default StyledOrderSummary;
