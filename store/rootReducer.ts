import { combineReducers } from "redux";
import environment from "./environment/reducer";
import translations from "./translations/reducers";

const rootReducer = combineReducers({
	environment,
	translations
});

export default rootReducer;
