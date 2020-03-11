import { combineReducers } from "redux";
import environment from "./environment/reducer";
import translations from "./translations/reducer";

const rootReducer = combineReducers({
	environment,
	translations
});

export default rootReducer;
