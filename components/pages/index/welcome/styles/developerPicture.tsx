import styled from "styled-components";

export const DeveloperPictureContainer = styled.div`
	position: absolute;
	top: 50%;
	right: 0px;
	width: 50%;
	transform: translateY(-50%);

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
		margin: auto;
		width: calc(100% - 5vw);
		transform: none;
	}
`;

export const DeveloperImage = styled.img`
	display: block;
	width: 100%;
`;
