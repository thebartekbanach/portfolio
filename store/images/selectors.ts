import { createSelector } from "reselect";
import { State } from "..";

export const loadedImages = (state: State) => state.images.loadedImages;

export const loadingImages = (state: State) => state.images.loadingImages;

export const isImageLoaded = (url: string) =>
	createSelector(loadedImages, loadedImages => loadedImages.includes(url));

export const isImageLoading = (url: string) =>
	createSelector(loadingImages, loadingImages => loadingImages.includes(url));
