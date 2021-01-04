import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const RealizationWrapper = styled.div`
	margin-bottom: 90px;

	@media (min-width: 1000px) {
		margin-bottom: 120px;

		display: grid;
		grid-template-columns: 10fr 9fr;
		grid-template-areas: "photo info";
		grid-column-gap: 120px;

		&:nth-child(even) {
			grid-template-areas: "info photo";
			grid-template-columns: 9fr 10fr;
		}
	}
`;

export const RealizationPreviewImageArea = styled.div`
	grid-area: photo;
	padding-bottom: 30px;

	@media (min-width: 1000px) {
		padding-bottom: 0;
	}
`;

export const RealizationPreviewImagesWrapper = styled.div`
	position: relative;
`;

export const RealizationPreviewImage = styled.img`
	position: relative;
	max-width: 100%;
	border-radius: 3px;
	z-index: 3;
	box-shadow: 0px 3px 15px 0px rgba(240, 250, 254, 0.2);
`;

interface RealizationPreviewSubImagesProps {
	index: 1 | 2;
	isVisible: boolean;
}

export const RealizationPreviewSubImageWrapper = styled.div<RealizationPreviewSubImagesProps>`
	position: absolute;
	bottom: 0;
	left: 50%;
	width: ${p => (p.index === 2 ? "90%" : "80%")};
	z-index: ${p => p.index};
	overflow: hidden;
	border-radius: 3px;
	box-shadow: 0px 3px 15px 0px rgba(240, 250, 254, 0.2);

	transform: translate(-50%, ${p => (p.index === 2 ? 15 : 30)}px) rotate(180deg);
`;

export const RealizationPreviewSubImage = styled.img`
	width: 100%;
	transform: scale(1.2);
	filter: blur(10px);
`;

export const RealizationInfoWrapper = styled.div`
	grid-area: info;
	padding: 5px;
`;

export const RealizationName = styled.h3`
	max-width: 100%;

	${useFont.montserrat.bold};
	text-align: center;
	font-size: 23px;
	letter-spacing: 1px;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	@media (min-width: 1000px) {
		text-align: left;
		font-size: 27px;
	}
`;

export const RealizationDescription = styled.p`
	${useFont.nunitoSans.regular};
	line-height: 21px;
`;

export const RealizationActionsWrapper = styled.div`
	display: grid;
	grid-template-columns: 6fr 3fr;
	grid-column-gap: 30px;
	padding: 20px 10px 0 10px;

	@media (min-width: 1000px) {
		padding: 0px;
		padding-top: 20px;
		max-width: 280px;
	}
`;

export const RealizationDetailsLink = styled.a`
	padding: 15px 30px;
	background: #5e58f8;
	border-radius: 60px;

	${useFont.nunitoSans.regular};
	text-align: center;
	text-decoration: none;
	color: white;
`;

export const RealizationPreviewLink = styled.a`
	display: flex;
	flex-direction: column;
	justify-content: center;

	${useFont.nunitoSans.bold};
	text-align: center;
	letter-spacing: 0.6px;
	color: #5e58f8;

	text-decoration: underline;
	text-underline-offset: 6px;
	text-decoration-thickness: 3px;
	text-decoration-color: #5e58f8;
`;
