import styled from "styled-components";

export const DeveloperPictureContainer = styled.div`
	position: absolute;
	top: 50%;
	right: 0px;
	transform: translateY(-50%);
	width: 50%;

	@media (max-width: 1199px) {
		right: -20px;
	}

	@media (max-width: 1150px) {
		transform: translateY(-42%);
	}

	@media (max-width: 800px) {
		position: relative;
		top: 0;
		right: 0;
		transform: none;
		width: calc(100% - 5vw);
		margin: auto;
	}
`;

export const DeveloperImage = styled.img`
	display: block;
	width: 100%;
`;
