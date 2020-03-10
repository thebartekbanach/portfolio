import { createActionCreator } from "deox";

const runningEnvironmentChanged = createActionCreator("environment/runningEnvironmentChanged");

export const environment = {
	runningEnvironmentChanged
};
