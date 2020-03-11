import { combineReducers } from "redux";
import environment from "./environment/reducers";
import translations from "./translations/reducers";

const rootReducer = combineReducers({
	environment,
	translations
});

export default rootReducer;
