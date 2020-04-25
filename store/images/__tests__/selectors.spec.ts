import { images } from "..";
import { DeepPartial } from "redux";
import { State } from "~/store";

describe(images.selectors.isImageLoaded, () => {
	it("should return true if image is loaded", () => {
		const state: DeepPartial<State> = {
			images: {
				loadedImages: ["https://youtube.com", "https://google.com"]
			}
		};

		const result = images.selectors.isImageLoaded("https://google.com")(state as State);

		expect(result).toBe(true);
	});

	it("should return false if image is not loaded", () => {
		const state: DeepPartial<State> = {
			images: {
				loadedImages: ["https://youtube.com"]
			}
		};

		const result = images.selectors.isImageLoaded("https://google.com")(state as State);

		expect(result).toBe(false);
	});
});

describe(images.selectors.isImageLoading, () => {
	it("should return true if image is loading", () => {
		const state: DeepPartial<State> = {
			images: {
				loadingImages: ["https://youtube.com", "https://google.com"]
			}
		};

		const result = images.selectors.isImageLoading("https://google.com")(state as State);

		expect(result).toBe(true);
	});

	it("should return false if image is not loading", () => {
		const state: DeepPartial<State> = {
			images: {
				loadingImages: ["https://youtube.com"]
			}
		};

		const result = images.selectors.isImageLoading("https://google.com")(state as State);

		expect(result).toBe(false);
	});
});
