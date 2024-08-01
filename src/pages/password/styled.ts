import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	h1 {
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.container {
		max-width: 50%;
		align-items: center;
		margin: 0 auto;
		.actions-button {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			margin-bottom: 10px;

			.action {
				background-color: blue;
				color: white;
				width: 200px;
				padding: 30px;
			}
		}
	}
`;
