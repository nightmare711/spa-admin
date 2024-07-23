import styled from "styled-components";

export const Wrapper = styled.div`
	.title {
		font-size: 20px;
	}
	.upload__image-wrapper {
		.update {
			width: 100%;
			height: 200px;
			border: 1px dashed #c4c4c4;
			margin-top: 10px;
		}
	}
	.title-text {
		margin-top: 20px;
	}
	.image-item {
		width: fit-content;
		.image-item__btn-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.actions {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
`;
