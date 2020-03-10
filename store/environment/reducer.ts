import { combineReducers } from "redux";
import { createReducer } from "deox";
import { environment } from "./actions";

const runningInBrowser = createReducer(false, handleAction => [
	handleAction(environment.runningEnvironmentChanged, () => true)
]);

export const environmentReducer = {
	runningInBrowser
};

export default combineReducers(environmentReducer);
