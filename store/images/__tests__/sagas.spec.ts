import { loadImageSaga, loadImage } from "../sagas";
import { expectSaga } from "redux-saga-test-plan";
import * as match from "redux-saga-test-plan/matchers";
import * as providers from "~/tests/utils/testEffectsProviders";
import { images } from "..";

describe(loadImageSaga, () => {
	it("should put success action on image load end", () => {
		const url = "https://google.com";

		return expectSaga(loadImageSaga, images.actions.loadImage.request(url))
			.provide([[match.call(loadImage, url), true]])
			.call(loadImage, url)
			.put(images.actions.loadImage.success(url))
			.run();
	});

	it("should put failed action on image load error", () => {
		const url = "https://google.com";

		const loadImageImplementation = jest.fn().mockImplementation(() => {
			throw new Error();
		});

		return expectSaga(loadImageSaga, images.actions.loadImage.request(url))
			.provide([providers.call(loadImage, url).mockedBy(loadImageImplementation)])
			.call(loadImage, url)
			.put(images.actions.loadImage.failed(url))
			.run();
	});
});
