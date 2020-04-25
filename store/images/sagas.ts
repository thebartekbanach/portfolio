import { takeEvery, call, put } from "~/utils/sagaEffects";
import { images } from ".";

export const loadImage = (url: string) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = url;
	});

export function* loadImageSaga(action: ReturnType<typeof images.actions.loadImage.request>) {
	const { url } = action.payload;

	try {
		yield* call(loadImage, url);
		yield* put(images.actions.loadImage.success(url));
	} catch (e) {
		yield* put(images.actions.loadImage.failed(url));
	}
}

export function* imagesWatchSaga() {
	yield* takeEvery(images.actions.loadImage.request, loadImageSaga);
}
