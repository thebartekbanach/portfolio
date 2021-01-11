import styled from "styled-components";

import { textGradient } from "~/utils/textGradient";
import { useFont } from "~/utils/useFont";

export const RealizationPageWrapper = styled.div`
	padding: 0 30px;
	max-width: 450px;
	margin: 0 auto;
	margin-top: 50px;
	margin-bottom: 80px;

	@media (min-width: 1200px) {
		width: 80%;
		max-width: 1400px;

		margin-top: 100px;
		margin-bottom: 150px;

		display: grid;
		grid-template-columns: minmax(0.5fr, 550px) 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			"title preview"
			"description preview"
			"tags preview";
		grid-column-gap: 100px;
	}

	@media (min-width: 1200px) {
		grid-column-gap: 150px;
	}
`;

export const RealizationNameAndDateWrapper = styled.header`
	margin-bottom: 50px;

	@media (min-width: 1200px) {
		grid-area: title;
		margin-bottom: 0;
	}
`;

export const RealizationName = styled.h1`
	margin-bottom: 10px;

	${textGradient("to bottom", "#694fff", "#4764e6", "#4764e6")};

	${useFont.montserrat.bold};
	text-align: center;
	letter-spacing: 1px;

	@media (min-width: 1200px) {
		text-align: left;
	}
`;

export const RealizationDate = styled.p`
	margin-top: 0;

	${useFont.nunitoSans.semiBold};
	text-align: center;
	color: #676767;

	@media (min-width: 1200px) {
		text-align: left;
	}
`;

export const RealizationDateArrow = styled.span`
	display: inline-block;
	position: relative;
	width: 30px;
	height: 13px;

	&::before,
	&::after {
		content: "";
		position: absolute;
	}

	&::before {
		background: #888;
		top: 6px;
		left: 8px;
		width: 12px;
		height: 2px;
	}

	&::after {
		width: 6px;
		height: 6px;
		top: 3px;
		left: 12px;

		border: 2px solid #888;
		border-left: none;
		border-bottom: none;

		transform: rotate(45deg);
	}
`;

export const RealizationPreviewImageAndButtonArea = styled.div`
	@media (min-width: 1200px) {
		grid-area: preview;
	}
`;

export const RealizationPreviewImageAndButtonWrapper = styled.div`
	@media (min-width: 1200px) {
		position: sticky;
		top: 50vh;

		transform: translateY(-50%);

		margin-top: 250px;
	}
`;

export const RealizationPreviewButtonWrapper = styled.div`
	text-align: center;
`;

export const RealizationPreviewButton = styled.a`
	display: inline-block;
	padding: 15px 60px;
	margin-top: 60px;

	border-radius: 30px;

	background: #5e58f8;
	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);

	transition: transform 300ms, box-shadow 250ms;

	${useFont.nunitoSans.regular};
	text-decoration: none;
	letter-spacing: 0.5px;
	color: white;

	&:hover {
		transform: scale(0.95);
		box-shadow: 0px 0px 0px 0 rgba(94, 88, 248, 0.46);
	}
`;

export const RealizationDescription = styled.div`
	margin-top: 35px;

	${useFont.nunitoSans.regular};
	line-height: 1.3em;
	letter-spacing: 0.6px;
	color: #676767;

	@media (min-width: 1000px) {
		grid-area: description;
		margin-top: 0;
	}
`;

export const RealizationTags = styled.div`
	margin-top: 30px;
	margin-left: -5px;

	@media (min-width: 1200px) {
		grid-area: tags;
		margin-top: 15px;
	}
`;

interface RealizationTagProps {
	tagColor: string;
}

export const RealizationTag = styled.span<RealizationTagProps>`
	display: inline-block;
	padding: 10px 20px;
	margin: 5px;

	background: ${p => p.tagColor};

	${useFont.nunitoSans.semiBold};
	white-space: nowrap;
	color: white;
	font-size: 14px;
`;
