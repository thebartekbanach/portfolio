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
	position: relative;
	grid-area: photo;
	padding-bottom: 30px;

	@media (min-width: 1000px) {
		padding-bottom: 0;
	}
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
	display: inline-block;

	padding: 15px 30px;
	border-radius: 60px;

	background: #5e58f8;
	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);
	transition: transform 300ms, box-shadow 250ms;

	${useFont.nunitoSans.regular};
	text-align: center;
	text-decoration: none;
	color: white;

	&:hover {
		transform: scale(0.95);
		box-shadow: 0px 0px 0px 0 rgba(94, 88, 248, 0.46);
	}
`;

interface RealizationPreviewLinkProps {
	disabled: boolean;
}

export const RealizationPreviewLink = styled.a<RealizationPreviewLinkProps>`
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

	transition: text-underline-offset 150ms;

	&:hover {
		text-underline-offset: 9px;
	}

	${p => p.disabled && "pointer-events: none; opacity: 0.55;"}
`;
