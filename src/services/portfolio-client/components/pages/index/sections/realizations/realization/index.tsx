import React, { FC, useLayoutEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

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
	previewType: "github" | "preview";
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
					<RealizationDetailsLink href={detailsUrl}>Szczegóły</RealizationDetailsLink>
					<RealizationPreviewLink href={previewUrl}>
						{previewType === "github" ? "Github" : "Podgląd"}
					</RealizationPreviewLink>
				</RealizationActionsWrapper>
			</RealizationInfoWrapper>
		</RealizationWrapper>
	);
};
