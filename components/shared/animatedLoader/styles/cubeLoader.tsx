import styled, { keyframes } from "styled-components";

const foldCubeAngleAnimation = keyframes`
	0%, 10% {
		transform: perspective(140px) rotateX(-180deg);
		opacity: 0; 
	}
	
	25%, 75% {
		transform: perspective(140px) rotateX(0deg);
		opacity: 1; 
	}
	
	90%, 100% {
		transform: perspective(140px) rotateY(180deg);
		opacity: 0; 
	}
`;

export const AnimatedLoaderCube = styled.div`
	float: left;
	width: 50%;
	height: 50%;
	position: relative;
	transform: scale(1.1);

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #694fff;
		animation: ${foldCubeAngleAnimation} 2.4s infinite linear both;
		transform-origin: 100% 100%;
	}

	&:nth-child(2) {
		transform: scale(1.1) rotateZ(90deg);

		&::before {
			animation-delay: 300ms;
		}
	}

	&:nth-child(3) {
		transform: scale(1.1) rotateZ(270deg);

		&::before {
			animation-delay: 900ms;
		}
	}

	&:nth-child(4) {
		transform: scale(1.1) rotateZ(180deg);

		&::before {
			animation-delay: 600ms;
		}
	}
`;

export const AnimatedCubeLoaderContainer = styled.div`
	margin: 20px auto;
	width: 30px;
	height: 30px;
	position: relative;
	transform: rotate(45deg);
`;
