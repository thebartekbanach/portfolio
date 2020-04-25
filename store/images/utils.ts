import { select, put, take } from "~/utils/sagaEffects";
import * as selectors from "./selectors";
import * as actions from "./actions";

type SuccessOrFailure =
	| ReturnType<typeof actions.loadImage.success>
	| ReturnType<typeof actions.loadImage.failed>;

export function* makeSureImageIsLoaded(url: string) {
	const isImageLoaded = yield* select(selectors.isImageLoaded(url));

	if (isImageLoaded) {
		return true;
	}

	yield* put(actions.loadImage.request(url));

	while (true) {
		const action: SuccessOrFailure = yield* take([
			actions.loadImage.success.type,
			actions.loadImage.failed.type
		]);

		if (action.payload.url !== url) {
			continue;
		}

		return action.type === actions.loadImage.success.type;
	}
}
