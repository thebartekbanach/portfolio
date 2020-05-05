import styled, { keyframes } from "styled-components";

const circleMoveAnimation = keyframes`
	0%, 100% {
		transform: translate(-50%, -50%) translateZ(0px) scale(0);
	}

	50% {
		transform: translate(-50%, -50%) translateZ(0px) scale(1);
	}
`;

export const CircleLoader = styled.div`
	position: relative;
	width: 50px;
	height: 50px;
	margin: auto;

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #694fff;
		opacity: 0.6;
		animation: ${circleMoveAnimation} 2s infinite ease-in-out;
		transform: translate(-50%, -50%) translateZ(0px);
		will-change: transform;
	}

	&::after {
		animation-delay: -1s;
	}
`;
