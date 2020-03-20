import { combineReducers } from "redux";
import { createReducer } from "deox";
import { pageTranslations } from ".";
import { AvailablePageTranslations } from "./models";

const availablePageTranslations = createReducer({} as AvailablePageTranslations, handleAction => [
	handleAction(pageTranslations.actions.pageTranslationsFetched, (state, { payload }) => {
		const newState = Object.assign({}, state);
		newState[payload.languageCode] = payload.translations;

		return newState;
	})
]);

export const pageTranslationsReducers = {
	availablePageTranslations
};

export default combineReducers(pageTranslationsReducers);
