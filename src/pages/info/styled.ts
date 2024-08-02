import styled from "styled-components";

export const Wrapper = styled.div`
	.form-container {
		padding: 20px 100px;
		h1 {
			font-size: 28px;
			text-align: center;
		}
		.breadcrumb {
			margin: 0;
		}
		.ant-breadcrumb {
			margin: 0;
		}
		.actions-button {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			.action {
				width: 200px;
				padding: 30px;
			}
		}
		.logo-container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			align-items: center;
			gap: 10px;
			.upload__image-wrapper {
				width: 300px;
				.update {
					width: 100%;
					height: 200px;
					border: 1px dashed #c4c4c4;
					margin-top: 10px;
				}
			}
		}
		.contact-container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 10px;
		}
		.title {
			font-size: 20px;
		}
		.upload__image-wrapper {
			.update {
				width: 100%;
				height: 200px;
				border: 1px dashed #c4c4c4;
				margin-top: 10px;
				margin-bottom: 10px;
			}
		}
		.title-text {
			margin-top: 20px;
		}
		.label-uploader {
			font-size: 14px;
			font-weight: 600;
			display: block;
			margin-top: 10px;
			margin-bottom: 10px;
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
			margin-top: 10px;
		}
	}
`;
