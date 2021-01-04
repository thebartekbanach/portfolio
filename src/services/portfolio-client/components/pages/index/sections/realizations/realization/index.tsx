import React, { FC } from "react";

import {
	RealizationActionsWrapper,
	RealizationDescription,
	RealizationDetailsLink,
	RealizationInfoWrapper,
	RealizationName,
	RealizationPreviewImage,
	RealizationPreviewImageArea,
	RealizationPreviewImagesWrapper,
	RealizationPreviewLink,
	RealizationPreviewSubImage,
	RealizationPreviewSubImageWrapper,
	RealizationWrapper
} from "./styles";

interface RealizationProps {
	previewImageUrl: string;
	name: string;
	description: string;
	detailsUrl: string;
	previewUrl: string;
	previewType: "github" | "preview";
}

export const Realization: FC<RealizationProps> = ({
	previewImageUrl,
	name,
	description,
	detailsUrl,
	previewUrl,
	previewType
}) => {
	return (
		<RealizationWrapper>
			<RealizationPreviewImageArea>
				<RealizationPreviewImagesWrapper>
					<RealizationPreviewImage src={previewImageUrl} />
					<RealizationPreviewSubImageWrapper index={2} isVisible={true}>
						<RealizationPreviewSubImage src={previewImageUrl} />
					</RealizationPreviewSubImageWrapper>
					<RealizationPreviewSubImageWrapper index={1} isVisible={true}>
						<RealizationPreviewSubImage src={previewImageUrl} />
					</RealizationPreviewSubImageWrapper>
				</RealizationPreviewImagesWrapper>
			</RealizationPreviewImageArea>
			<RealizationInfoWrapper>
				<RealizationName>{name}</RealizationName>
				<RealizationDescription>{description}</RealizationDescription>
				<RealizationActionsWrapper>
					<RealizationDetailsLink href={detailsUrl}>Szczegóły</RealizationDetailsLink>
					<RealizationPreviewLink href={previewUrl}>
						{previewType === "github" ? "Github" : "Podgląd"}
					</RealizationPreviewLink>
				</RealizationActionsWrapper>
			</RealizationInfoWrapper>
		</RealizationWrapper>
	);
};
