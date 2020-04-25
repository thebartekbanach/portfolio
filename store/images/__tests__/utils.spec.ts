import * as match from "redux-saga-test-plan/matchers";
import * as providers from "~/tests/utils/testEffectsProviders";
import { images } from "..";
import { expectSaga } from "redux-saga-test-plan";

describe(images.utils.makeSureImageIsLoaded, () => {
	it.skip("should return true if image is already loaded", () => {
		const correctUrl = "https://google.com";
		const selectMock = providers
			.select(images.selectors.isImageLoaded(correctUrl))
			.usingNameMockedBy(jest.fn().mockReturnValue(true));

		return expectSaga(images.utils.makeSureImageIsLoaded, correctUrl)
			.provide([selectMock])
			.returns(true)
			.run();
	});

	it.skip("should return true if image is loaded on first take", () => {
		const correctUrl = "https://google.com";
		const selectMock = providers
			.select(images.selectors.isImageLoaded(correctUrl))
			.usingNameMockedBy(jest.fn().mockReturnValue(false));
		const successOrFailureActions = [
			images.actions.loadImage.success.type,
			images.actions.loadImage.failed.type
		];

		return expectSaga(images.utils.makeSureImageIsLoaded, correctUrl)
			.provide([
				selectMock,
				[match.take(successOrFailureActions), images.actions.loadImage.success(correctUrl)]
			])
			.take(successOrFailureActions)
			.returns(true)
			.run();
	});

	it("should return true only if correct image is loaded", async () => {
		const correctUrl = "https://google.com";
		const incorrectUrl = "https://youtube.com";

		const successOrFailureActions = [
			images.actions.loadImage.success.type,
			images.actions.loadImage.failed.type
		];

		const takeMock = providers.take(successOrFailureActions).mockedBy(
			jest
				.fn()
				.mockImplementationOnce(() => images.actions.loadImage.failed(incorrectUrl))
				.mockImplementationOnce(() => images.actions.loadImage.success(incorrectUrl))
				.mockImplementationOnce(() => images.actions.loadImage.success(correctUrl))
		);

		const selectMock = providers
			.select(images.selectors.isImageLoaded(correctUrl))
			.usingNameMockedBy(jest.fn().mockReturnValue(false));

		await expectSaga(images.utils.makeSureImageIsLoaded, correctUrl)
			.provide([selectMock, takeMock])
			.take(successOrFailureActions)
			.take(successOrFailureActions)
			.take(successOrFailureActions)
			.returns(true)
			.run();
	});

	it.skip("should return false on image load failure", () => {
		const correctUrl = "https://google.com";
		const selectMock = providers
			.select(images.selectors.isImageLoaded(correctUrl))
			.usingNameMockedBy(jest.fn().mockReturnValue(false));
		const successOrFailureActions = [
			images.actions.loadImage.success.type,
			images.actions.loadImage.failed.type
		];

		return expectSaga(images.utils.makeSureImageIsLoaded, correctUrl)
			.provide([
				selectMock,
				[match.take(successOrFailureActions), images.actions.loadImage.failed(correctUrl)]
			])
			.take(successOrFailureActions)
			.returns(false)
			.run();
	});
});
