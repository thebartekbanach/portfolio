import { counterActions } from "./actions";
import { createReducer } from "deox";

const defaultState = 0;

export const counterReducer = createReducer(defaultState, handleAction => [
	handleAction(counterActions.incrementAsync.success, state => state + 1)
]);
