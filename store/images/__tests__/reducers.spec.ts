import { imagesReducers } from "../reducers";
import { images } from "..";

describe(imagesReducers.loadedImages, () => {
	it("should add image url on loadImage.success action", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.success("https://google.com");

		const result = imagesReducers.loadedImages(initialState, action);

		expect(result).toEqual(["https://youtube.com", "https://google.com"]);
	});

	it("should not modify initial state", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.success("https://google.com");

		imagesReducers.loadedImages(initialState, action);

		expect(initialState).not.toContainEqual("https://google.com");
	});
});

describe(imagesReducers.loadingImages, () => {
	it("should add image url on loadImage.request action", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.request("https://google.com");

		const result = imagesReducers.loadingImages(initialState, action);

		expect(result).toEqual(["https://youtube.com", "https://google.com"]);
	});

	it("should not modify initial state on loadImage.request action", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.request("https://google.com");

		imagesReducers.loadingImages(initialState, action);

		expect(initialState).toEqual(["https://youtube.com"]);
	});

	it("should remove image url on loadImage.success action", () => {
		const initialState = ["https://youtube.com", "https://google.com"];
		const action = images.actions.loadImage.success("https://google.com");

		const result = imagesReducers.loadingImages(initialState, action);

		expect(result).not.toContainEqual("https://google.com");
	});

	it("should not modify initial state on loadImage.success action", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.success("https://google.com");

		imagesReducers.loadingImages(initialState, action);

		expect(initialState).toEqual(["https://youtube.com"]);
	});

	it("should remove image url on loadImage.failed action", () => {
		const initialState = ["https://youtube.com", "https://google.com"];
		const action = images.actions.loadImage.failed("https://google.com");

		const result = imagesReducers.loadingImages(initialState, action);

		expect(result).not.toContainEqual("https://google.com");
	});

	it("should not modify initial state on loadImage.failed action", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.failed("https://google.com");

		imagesReducers.loadingImages(initialState, action);

		expect(initialState).toEqual(["https://youtube.com"]);
	});
});

describe(imagesReducers.failedToLoad, () => {
	it("should add image url on loadImage.success action", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.failed("https://google.com");

		const result = imagesReducers.failedToLoad(initialState, action);

		expect(result).toEqual(["https://youtube.com", "https://google.com"]);
	});

	it("should not modify initial state", () => {
		const initialState = ["https://youtube.com"];
		const action = images.actions.loadImage.failed("https://google.com");

		imagesReducers.failedToLoad(initialState, action);

		expect(initialState).not.toContainEqual("https://google.com");
	});
});
