import { createActionCreator } from "deox";

export const counterActions = {
	incrementAsync: {
		request: createActionCreator("INCREMENT::REQUEST"),
		success: createActionCreator("INCREMENT::SUCCESS")
	}
};
