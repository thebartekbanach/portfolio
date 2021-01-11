import { FC } from "react";

import { DecorativePicture } from "~/components/shared/decorativePicture";

import {
	RealizationName,
	RealizationPageWrapper,
	RealizationPreviewButton,
	RealizationPreviewButtonWrapper,
	RealizationPreviewImageAndButtonArea,
	RealizationTag,
	RealizationTags,
	RealizationDescription,
	RealizationNameAndDateWrapper,
	RealizationDate,
	RealizationDateArrow,
	RealizationPreviewImageAndButtonWrapper
} from "./styles";

export interface RealizationInfo {
	id: string;
	title: string;
	realizationTime: {
		from: string;
		to: string;
	};
	previewPicture: string;
	contentUrl: string;
	previewUrl: string;
	tags: Record<string, string[]>;
}

interface RealizationPageContentProps {
	realizationInfo: RealizationInfo;
	realizationContent: string;
}

const convertDate = (dateString: string) => {
	const date = new Date(dateString);

	const day = date.getDate();
	const year = date.getFullYear();

	const monthName = date.toLocaleString("pl", { month: "short" });
	const monthNameCapitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);

	return `${day} ${monthNameCapitalized} ${year}`;
};

export const RealizationPageContent: FC<RealizationPageContentProps> = ({
	realizationInfo,
	realizationContent
}) => {
	const { title, realizationTime, previewPicture, previewUrl, tags } = realizationInfo;

	const renderedTags = Object.keys(tags)
		.map(tagColor => ({ tagColor, items: tags[tagColor] }))
		.map(({ tagColor, items }) =>
			items.map(item => (
				<RealizationTag key={item} tagColor={tagColor}>
					{item}
				</RealizationTag>
			))
		);

	return (
		<RealizationPageWrapper>
			<RealizationNameAndDateWrapper>
				<RealizationName>{title}</RealizationName>
				<RealizationDate>
					{convertDate(realizationTime.from)}
					<RealizationDateArrow />
					{convertDate(realizationTime.to)}
				</RealizationDate>
			</RealizationNameAndDateWrapper>
			<RealizationPreviewImageAndButtonArea>
				<RealizationPreviewImageAndButtonWrapper>
					<DecorativePicture imageUrl={previewPicture} />
					<RealizationPreviewButtonWrapper>
						<RealizationPreviewButton href={previewUrl}>
							Podgląd
						</RealizationPreviewButton>
					</RealizationPreviewButtonWrapper>
				</RealizationPreviewImageAndButtonWrapper>
			</RealizationPreviewImageAndButtonArea>
			<RealizationDescription dangerouslySetInnerHTML={{ __html: realizationContent }} />
			<RealizationTags>{renderedTags}</RealizationTags>
		</RealizationPageWrapper>
	);
};
