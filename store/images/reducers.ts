import { createReducer } from "deox";
import { combineReducers } from "redux";
import { images } from ".";

const loadedImages = createReducer([] as string[], handle => [
	handle(images.actions.loadImage.success, (state, action) => [...state, action.payload.url])
]);

const loadingImages = createReducer([] as string[], handle => [
	handle(images.actions.loadImage.request, (state, action) => [...state, action.payload.url]),
	handle([images.actions.loadImage.success, images.actions.loadImage.failed], (state, action) =>
		state.filter(url => url !== action.payload.url)
	)
]);

const failedToLoad = createReducer([] as string[], handle => [
	handle(images.actions.loadImage.failed, (state, action) => [...state, action.payload.url])
]);

export const imagesReducers = {
	loadedImages,
	loadingImages,
	failedToLoad
};

export default combineReducers(imagesReducers);
