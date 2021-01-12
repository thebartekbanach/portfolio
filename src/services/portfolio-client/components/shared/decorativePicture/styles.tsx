import styled from "styled-components";

interface DecorativePictureWrapperProps {
	isPreviewImageLoaded: boolean;
}

export const DecorativePictureWrapper = styled.div<DecorativePictureWrapperProps>`
	position: relative;
	width: 100%;
	padding-top: ${p => (p.isPreviewImageLoaded ? 0 : 56.25)}%; /* 16:9 aspect ratio */
`;

export const DecorativePicturePlaceholder = styled.div`
	position: absolute;

	top: 0;
	left: 0;
	width: 100%;

	padding-top: 56.25%; /* 16:9 aspect ratio */

	background: #f1f1f1;

	transition: opacity 300ms;

	&::before,
	&::after {
		content: "";

		position: absolute;
		z-index: -1;

		bottom: 0;
		left: 50%;
		height: 100%;
		width: 90%;

		background: #e8e8e8;
		transform: translate(-50%, 15px);
	}

	&::after {
		z-index: -2;
		width: 80%;
		transform: translate(-50%, 30px);
		background: #e3e3e3;
	}

	&.exit-active {
		opacity: 0;
	}

	&.exit {
		opacity: 0;
	}
`;

export const DecorativePictureBody = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	transition: opacity 300ms;

	&.enter {
		opacity: 0;
	}

	&.enter-active {
		opacity: 1;
	}
`;

export const DecorativeImage = styled.img`
	position: relative;
	max-width: 100%;
	z-index: 3;

	border-radius: 3px;
	box-shadow: 0px 3px 15px 0px rgba(240, 250, 254, 0.2);
`;

interface DecorativeSubImageWrapperProps {
	index: 1 | 2;
	isVisible: boolean;
}

export const DecorativeSubImageWrapper = styled.div<DecorativeSubImageWrapperProps>`
	position: absolute;
	z-index: ${p => p.index};

	bottom: 0;
	left: 50%;
	width: ${p => (p.index === 2 ? "90%" : "80%")};

	overflow: hidden;
	border-radius: 3px;
	box-shadow: 0px 3px 15px 0px rgba(240, 250, 254, 0.2);

	transform: translate(-50%, ${p => (!p.isVisible ? -10 : p.index === 2 ? 15 : 30)}px)
		rotate(180deg);
	transition: transform 300ms;
	transition-delay: ${p => (p.index === 2 ? 200 : 400)}ms;
`;

export const DecorativeSubImage = styled.img`
	width: 100%;
	transform: scale(1.2);
	filter: blur(10px);
`;
