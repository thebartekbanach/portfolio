import { createActionCreator } from "deox";

export const loadImage = {
	request: createActionCreator("images/loadImage/request", resolve => (url: string) =>
		resolve({ url })
	),
	success: createActionCreator("images/loadImage/success", resolve => (url: string) =>
		resolve({ url })
	),
	failed: createActionCreator("images/loadImage/failed", resolve => (url: string) =>
		resolve({ url })
	)
};
