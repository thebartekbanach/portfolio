import React, { FC } from "react";

import { DecorativePicture } from "~/components/shared/decorativePicture";
import { useTranslation, Link } from "~/utils/i18next";
import { LazyLoadChainDelegate } from "~/utils/lazyLoadChain";

import {
	RealizationActionsWrapper,
	RealizationDescription,
	RealizationDetailsLink,
	RealizationInfoWrapper,
	RealizationName,
	RealizationPreviewImageArea,
	RealizationPreviewLink,
	RealizationWrapper
} from "./styles";

interface RealizationProps {
	previewImageUrl: string;
	previewImageLoadDelegate: LazyLoadChainDelegate;
	name: string;
	description: string;
	detailsUrl: string;
	previewUrl: string;
	previewType: "github" | "website";
}

export const Realization: FC<RealizationProps> = ({
	previewImageUrl,
	previewImageLoadDelegate,
	name,
	description,
	detailsUrl,
	previewUrl,
	previewType
}) => {
	const [t] = useTranslation("pages.index");

	const detailsButtonContent = t("realizations.buttons.details");

	const previewTranslationType = previewType === "website" ? "preview" : "github";
	const previewButtonContent = t(`realizations.buttons.${previewTranslationType}`);

	return (
		<RealizationWrapper>
			<RealizationPreviewImageArea>
				<DecorativePicture
					imageUrl={previewImageUrl}
					lazyLoadDelegate={previewImageLoadDelegate}
				/>
			</RealizationPreviewImageArea>
			<RealizationInfoWrapper>
				<RealizationName>{name}</RealizationName>
				<RealizationDescription>{description}</RealizationDescription>
				<RealizationActionsWrapper>
					<Link href={detailsUrl} passHref scroll={false}>
						<RealizationDetailsLink>{detailsButtonContent}</RealizationDetailsLink>
					</Link>
					<RealizationPreviewLink href={previewUrl}>
						{previewButtonContent}
					</RealizationPreviewLink>
				</RealizationActionsWrapper>
			</RealizationInfoWrapper>
		</RealizationWrapper>
	);
};
