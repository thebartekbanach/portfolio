import { createReducer } from "deox";
import { combineReducers } from "redux";
import { navbar } from ".";

export const mobileNavbarOpenState = createReducer(false, handle => [
	handle(navbar.actions.internal.setMenuState, (_, action) => action.payload.nextMenuState)
]);

export default combineReducers({
	mobileNavbarOpenState
});
