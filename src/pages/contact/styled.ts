import styled from "styled-components";

export const Wrapper = styled.div`
	.banner-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}
	.actions-button {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 10px;
		.action {
			width: 200px;
			padding: 30px;
		}
	}
	.mark-icon {
		color: green;
	}
`;
