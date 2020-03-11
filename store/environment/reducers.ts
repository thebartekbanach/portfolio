import { combineReducers } from "redux";
import { createReducer } from "deox";
import { environment } from ".";

const runningInBrowser = createReducer(false, handleAction => [
	handleAction(environment.actions.runningEnvironmentChanged, () => true)
]);

export const environmentReducer = {
	runningInBrowser
};

export default combineReducers(environmentReducer);
