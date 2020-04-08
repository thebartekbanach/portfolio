import { createReducer } from "deox";
import { combineReducers } from "redux";
import { navbar } from ".";

const mobileNavbarOpenState = createReducer(false, handle => [
	handle(navbar.actions.internal.setMenuState, (_, action) => action.payload.nextMenuState)
]);

export const navbarReducers = {
	mobileNavbarOpenState
};

export default combineReducers(navbarReducers);
