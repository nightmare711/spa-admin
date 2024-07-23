import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	color: black;
	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 50%;
		background-image: url("/images/bg-login.jpg");
		background-position: center;
		background-size: cover;
		background-color: black;
		z-index: -1;
		.shape {
			background: linear-gradient(to right, #364574, #405189);
			opacity: 0.9;
			position: absolute;
			height: 100%;
			width: 100%;
			z-index: -1;
			right: 0;
			bottom: 0;
			left: 0;
			top: 0;
		}
	}
	.form {
		background-color: white;
	}
`;
