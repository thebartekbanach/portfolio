import React, { FC, useLayoutEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useTranslation, Link } from "~/utils/i18next";
import { LazyLoadChainDelegate } from "~/utils/lazyLoadChain";
import { loadImage } from "~/utils/loadImage";

import {
	PreviewImagePlaceholder,
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
	const [t] = useTranslation("indexPage");

	const [isPreviewImageLoaded, setIsPreviewImageLoaded] = useState(false);

	// null means "not initialized"
	// it is changing from null to false to force rerender component
	// then when areImagesVisible is false and isPreviewImageLoaded is true
	// it is set to true to start show animation
	const [areSubImagesVisible, setAreSubImagesVisible] = useState(null as boolean | null);

	previewImageLoadDelegate(async () => {
		await loadImage(previewImageUrl);
		setIsPreviewImageLoaded(true);
	});

	useLayoutEffect(() => {
		if (!isPreviewImageLoaded) {
			return;
		}

		if (areSubImagesVisible === false) {
			setAreSubImagesVisible(true);
		} else if (areSubImagesVisible === null) {
			setAreSubImagesVisible(false);
		}
	}, [isPreviewImageLoaded, areSubImagesVisible]);

	const previewImage = (
		<RealizationPreviewImagesWrapper>
			<RealizationPreviewImage src={previewImageUrl} />
			<RealizationPreviewSubImageWrapper index={2} isVisible={areSubImagesVisible ?? false}>
				<RealizationPreviewSubImage src={previewImageUrl} />
			</RealizationPreviewSubImageWrapper>
			<RealizationPreviewSubImageWrapper index={1} isVisible={areSubImagesVisible ?? false}>
				<RealizationPreviewSubImage src={previewImageUrl} />
			</RealizationPreviewSubImageWrapper>
		</RealizationPreviewImagesWrapper>
	);

	const imagePlaceholder = <PreviewImagePlaceholder />;

	const detailsButtonContent = t("realizations.buttons.details");

	const previewTranslationType = previewType === "website" ? "preview" : "github";
	const previewButtonContent = t(`realizations.buttons.${previewTranslationType}`);

	return (
		<RealizationWrapper>
			<RealizationPreviewImageArea>
				<SwitchTransition mode="in-out">
					<CSSTransition
						key={isPreviewImageLoaded ? "preview" : "placeholder"}
						timeout={700}
					>
						{isPreviewImageLoaded ? previewImage : imagePlaceholder}
					</CSSTransition>
				</SwitchTransition>
			</RealizationPreviewImageArea>
			<RealizationInfoWrapper>
				<RealizationName>{name}</RealizationName>
				<RealizationDescription>{description}</RealizationDescription>
				<RealizationActionsWrapper>
					<Link href={detailsUrl} passHref>
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
