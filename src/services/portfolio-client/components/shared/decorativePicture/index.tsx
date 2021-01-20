import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { LazyLoadChainDelegate } from "~/utils/lazyLoadChain";
import { loadImage } from "~/utils/loadImage";

import {
	DecorativePicturePlaceholder,
	DecorativeImage,
	DecorativePictureWrapper,
	DecorativeSubImage,
	DecorativeSubImageWrapper,
	DecorativePictureBody,
	DecorativeImageWrapper
} from "./styles";

interface DecorativePictureProps {
	imageUrl: string;
	lazyLoadDelegate?: LazyLoadChainDelegate;
}

export const DecorativePicture: FC<DecorativePictureProps> = ({ imageUrl, lazyLoadDelegate }) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	// null means "not initialized"
	// it is changing from null to false to force rerender component
	// then when areImagesVisible is false and isPreviewImageLoaded is true
	// it is set to true to start show animation
	const [areSubImagesVisible, setAreSubImagesVisible] = useState(null as boolean | null);

	if (lazyLoadDelegate !== undefined) {
		lazyLoadDelegate(async () => {
			await loadImage(imageUrl);
			setIsImageLoaded(true);
		});
	}

	useEffect(() => {
		if (lazyLoadDelegate === undefined) {
			loadImage(imageUrl).then(() => {
				setIsImageLoaded(true);
			});
		}
	}, []);

	useLayoutEffect(() => {
		if (!isImageLoaded) {
			return;
		}

		if (areSubImagesVisible === false) {
			setAreSubImagesVisible(true);
		} else if (areSubImagesVisible === null) {
			setAreSubImagesVisible(false);
		}
	}, [isImageLoaded, areSubImagesVisible]);

	const decorativePicture = (
		<DecorativePictureBody>
			<DecorativeImageWrapper>
				<DecorativeImage src={isImageLoaded ? imageUrl : ""} />
			</DecorativeImageWrapper>
			<DecorativeSubImageWrapper index={2} isVisible={areSubImagesVisible ?? false}>
				<DecorativeSubImage src={areSubImagesVisible !== null ? imageUrl : ""} />
			</DecorativeSubImageWrapper>
			<DecorativeSubImageWrapper index={1} isVisible={areSubImagesVisible ?? false}>
				<DecorativeSubImage src={areSubImagesVisible !== null ? imageUrl : ""} />
			</DecorativeSubImageWrapper>
		</DecorativePictureBody>
	);

	return (
		<DecorativePictureWrapper isPreviewImageLoaded={isImageLoaded}>
			<SwitchTransition mode="in-out">
				<CSSTransition key={isImageLoaded ? "preview" : "placeholder"} timeout={700}>
					{isImageLoaded ? decorativePicture : <DecorativePicturePlaceholder />}
				</CSSTransition>
			</SwitchTransition>
		</DecorativePictureWrapper>
	);
};
