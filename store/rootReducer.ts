import { combineReducers } from "redux";
import environment from "./environment/reducers";
import translations from "./translations/reducers";
import pageTranslations from "./pageTranslations/reducers";

const rootReducer = combineReducers({
	environment,
	translations,
	pageTranslations
});

export default rootReducer;
