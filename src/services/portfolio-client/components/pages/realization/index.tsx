import { FC } from "react";

import { DecorativePicture } from "~/components/shared/decorativePicture";
import { useTranslation } from "~/utils/i18next";

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
	previewType: "github" | "website";
	tags: Record<string, string[]>;
}

interface RealizationPageContentProps {
	realizationInfo: RealizationInfo;
	realizationContent: string;
	lang: string;
}

export const RealizationPageContent: FC<RealizationPageContentProps> = ({
	realizationInfo,
	realizationContent,
	lang
}) => {
	const [t] = useTranslation("realizationPage");
	const {
		title,
		realizationTime,
		previewPicture,
		previewUrl,
		previewType,
		tags
	} = realizationInfo;

	const renderedTags = Object.keys(tags)
		.map(tagColor => ({ tagColor, items: tags[tagColor] }))
		.map(({ tagColor, items }) =>
			items.map(item => (
				<RealizationTag key={item} tagColor={tagColor}>
					{item}
				</RealizationTag>
			))
		);

	console.log(`FORMATTING DATE WITH LANG: ${lang}`);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		const day = date.getDate();
		const year = date.getFullYear();
		const month = date.getMonth();

		const months = t("common:shortMonthNames", { returnObjects: true });
		const monthName = months[month];

		return `${day} ${monthName} ${year}`;
	};

	return (
		<RealizationPageWrapper>
			<RealizationNameAndDateWrapper>
				<RealizationName>{title}</RealizationName>
				<RealizationDate>
					{formatDate(realizationTime.from)}
					<RealizationDateArrow />
					{formatDate(realizationTime.to)}
				</RealizationDate>
			</RealizationNameAndDateWrapper>
			<RealizationPreviewImageAndButtonArea>
				<RealizationPreviewImageAndButtonWrapper>
					<DecorativePicture imageUrl={previewPicture} />
					<RealizationPreviewButtonWrapper>
						<RealizationPreviewButton href={previewUrl}>
							{t(
								previewType === "github"
									? "previewGithubButton"
									: "previewWebsiteButton"
							)}
						</RealizationPreviewButton>
					</RealizationPreviewButtonWrapper>
				</RealizationPreviewImageAndButtonWrapper>
			</RealizationPreviewImageAndButtonArea>
			<RealizationDescription dangerouslySetInnerHTML={{ __html: realizationContent }} />
			<RealizationTags>{renderedTags}</RealizationTags>
		</RealizationPageWrapper>
	);
};
